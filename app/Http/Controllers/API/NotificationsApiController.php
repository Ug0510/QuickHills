<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Helpers\PushHelpers;
use App\Helpers\FirebaseHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Device;
use App\Models\Product;
use App\Models\Notification;
use App\Models\Setting;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NotificationsApiController extends Controller
{
    public function index(){
        $users = User::where('status',1)->orderBy('id','DESC')->get()->toArray();
        $categories = Category::where('status',1)->orderBy('id','DESC')->get()->toArray();
        $products = Product::where('status',1)->where('is_approved',1)->orderBy('id','DESC')->get()->toArray();
        $notifications = Notification::orderBy('id','DESC')->get();
        $data = array(
            "users" => $users,
            "categories" => $categories,
            "products" => $products,
            "notifications" => $notifications
        );
        return CommonHelper::responseWithData($data);
    }

    public function save(Request $request){
        //\Log::info('Save : ',[$request->all()]);
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'type_id' => 'required_if:type,category,product,user|numeric',
            'title' => 'required',
            'message' => 'required',
            'image' => ['required_if:include_image,true','nullable','mimes:jpeg,jpg,png,gif'],
            'type_link' => 'required_if:type,==,url',
        ]);
        $validator->setCustomMessages([
            'type_id.required_if' => 'The :attribute field is required when the type is category, product.',
            'type_id.numeric'     => 'Please select Category or Product',
           
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }

        if($request->type == "user"){
            $type_ids =  explode(',',$request->type_ids);
            foreach ($type_ids as $key => $type_id){
                $notification = new Notification();
                $notification->type = $request->type;
                $notification->type_id = $type_id;
                $notification->type_link = $request->type_link ?? "";
                $notification->title = $request->title;
                $notification->message = $request->message;
                $image = '';
                if ($request->include_image == 'true' && $request->hasFile('image')) {
                    $file = $request->file('image');
                    $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                    $image = Storage::disk('public')->putFileAs('notifications', $file,$fileName);
                }
                $notification->image = $image;
                $notification->save();
            }
        }else {
            $notification = new Notification();
            $notification->type = $request->type;
            $notification->type_id = $request->type_id;
            $notification->type_link = $request->type_link ?? "";
            $notification->title = $request->title;
            $notification->message = $request->message;
            $image = '';
            if ($request->include_image == 'true' && $request->hasFile('image')) {
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('notifications', $file,$fileName);
            }
            $notification->image = $image;
            $notification->save();
        }


        $pushNotification = CommonHelper::getPushObject($request, $image); 

        log::info("pushNotification",[$pushNotification]);

        // Type: User

        if(isset($type_ids) && count($type_ids)>0){
            $userTokens = UserToken::where('type','customer')->whereIn('user_id',$type_ids)->get()->pluck('fcm_token','platform')->toArray();
        }else{
            $userTokens = UserToken::where('type','customer')->get()->pluck('fcm_token','platform')->toArray();
        }

        if(isset($userTokens) && count($userTokens)>0){
            $userTokens = array_unique($userTokens);
            foreach ($userTokens as $platform => $deviceToken) {
                try {
                    FirebaseHelper::send($platform,$deviceToken,  $pushNotification['fcmMsg'],  $pushNotification['notification']);
                } catch (\Exception $e) {
                    // Handle exception - token might be invalid
                    echo "Error sending notification to device token: $deviceToken - " . $e->getMessage() . "<br>";
                    // Optionally, you can remove the invalid token from your database
                    // removeInvalidToken($deviceToken);
                }
            }
        }else{
            $notification = array('status' => 0, 'message' => "You user have no token for Notification");
            return CommonHelper::responseSuccessWithData("Notification Saved Successfully!", $notification);
        }

        // if(isset($userTokens) && count($userTokens)>0){
        //   try {
        //       // $fcmTokens = array_chunk($userTokens,1000);
        //         foreach($userTokens as $deviceTokens){
        //             //FirebaseHelper::sendPushNotification($userTokens, $pushNotification);
        //             FirebaseHelper::send($deviceTokens, $pushNotification['fcmMsg'], $pushNotification['notification']);
                    
        //          }
        //     }catch ( \Exception $e){
        //         Log::error("Error send notification :",[$e->getMessage()] );
        //     }
        // }else{
        //     $notification = array('status' => 0, 'message' => "You user have no token for Notification");
        //     return CommonHelper::responseSuccessWithData("Notification Saved Successfully!", $notification);
        // }
        return CommonHelper::responseSuccess("Notification Saved Successfully!");
    }

    public function delete(Request $request){
        if(isset($request->id)){
            $notification = Notification::find($request->id);
            if($notification){
                @Storage::disk('public')->delete($notification->image);
                $notification->delete();
                return CommonHelper::responseSuccess("Notification Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Notification Already Deleted!");
            }
        }
    }
}
