<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\Role;
use App\Models\Seller;
use App\Models\SellerCommission;
use App\Models\Setting;
use App\Models\Tax;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class SellerApiController extends Controller
{
    public function getSellers(Request $request){
        $filterStatus = $request->filterStatus ?? 1;
        $sellers = Seller::with('city', 'categories') ;
       
        if(isset($filterStatus) && $filterStatus != ""){
            $sellers = $sellers->where("status",$filterStatus);
        }
        $sellers = $sellers->orderBy('id','DESC')->get();
       
        return CommonHelper::responseWithData($sellers);
    }

    public function save(Request $request){
        //\Log::info('Save : ',[$request->all()]);

        //dd($request->password,$request->confirm_password);

        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'email|required|unique:admins',
            'mobile' => 'required',
            'password' => 'min:6|required_with:confirm_password|same:confirm_password',
            'store_name' => 'required',
            'categories_ids' => 'required',
            'pan_number' => 'required',
            'commission' => 'required',
            'national_id_card' => 'required|mimes:jpeg,jpg,png,gif,pdf',
            'address_proof' => 'required|mimes:jpeg,jpg,png,gif,pdf',
            'store_logo' => 'required|mimes:jpeg,jpg,png,gif',
            'city_id' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'bank_name' => 'required',
            'account_number' => 'required',
            'ifsc_code' => 'required',
            'account_name' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        DB::beginTransaction();
        try {
            $data = array();
            $data['username'] = $request->name;
            $data['email'] = $request->email;
            $data['password'] = bcrypt($request->password);
            $data['role_id'] = Role::$roleSeller;
            $data['created_by'] = 0;
            $admin = Admin::create($data);

            $record = new Seller();
            $shop_opened_closed = $request->input('shop_opened_closed', 1);
            $record->shop_opened_closed = $shop_opened_closed;
            $record->admin_id = $admin->id;
            $record->name = $request->name;
            $record->email = $request->email;
            $record->mobile = $request->mobile;
            $record->store_url = $request->store_url;
            //$record->password = $request->password;
            $record->store_name = $request->store_name;
            $record->street = $request->street;
            $record->pincode_id = ($request->pincode_id)??0;
            $record->city_id = $request->city_id;
            $record->categories = $request->categories_ids;
            $record->state = $request->state;
            $record->account_number = $request->account_number;
            $record->bank_ifsc_code = $request->ifsc_code;
            $record->bank_name = $request->bank_name;
            $record->account_name = $request->account_name;
            $record->commission = $request->commission;
            $record->tax_name = $request->tax_name;
            $record->tax_number = $request->tax_number;
            $record->pan_number = $request->pan_number;
            $record->latitude = $request->latitude;
            $record->longitude = $request->longitude;
            $record->place_name = $request->place_name;
            $record->formatted_address = $request->formatted_address;

            $record->store_description = $request->store_description;
            $record->require_products_approval = $request->require_products_approval;
            $record->customer_privacy = $request->customer_privacy;
            $record->view_order_otp = $request->view_order_otp;
            $record->assign_delivery_boy = $request->assign_delivery_boy;
            $record->change_order_status_delivered = $request->change_order_status_delivered;
            $record->status = Seller::$statusActive;
            $record->slug = Str::slug($request->name);

            if($request->hasFile('store_logo')){
                $file = $request->file('store_logo');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
                $record->logo = $image;
            }

            if($request->hasFile('national_id_card')){
                $file = $request->file('national_id_card');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
                $record->national_identity_card = $image;
            }

            if($request->hasFile('address_proof')){
                $file = $request->file('address_proof');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file,$fileName);
                $record->address_proof = $image;
            }
            $record->save();

            $categories_ids = explode(',',$request->categories_ids);
            foreach ($categories_ids as $key => $category_id){
                $commission = new SellerCommission();
                $commission->seller_id = $record->id;
                $commission->category_id = $category_id;
                $commission->save();
            }

            DB::commit();
        } catch (\Exception $e) {
            Log::info("Error : ".$e->getMessage());
            DB::rollBack();
            // throw $e;
            return CommonHelper::responseError("Something Went Wrong!");
        }


        try {
            CommonHelper::sendMailAdminStatus("seller", $record, $record->status, $request->email);
        }catch ( \Exception $e){
            Log::error("Add Seller status send mail error",[$e->getMessage()] );
        }

        return CommonHelper::responseSuccess("Seller Saved Successfully!");
    }
    public function edit($id){
        $seller = Seller::with('admin')->where('id',$id)->first();
        
        if(!$seller){
            return CommonHelper::responseError("Seller Not found!");
        }
        return CommonHelper::responseWithData($seller);
    }

    public function update(Request $request)
    {
        Log::info("Seller update request received", ['request_id' => $request->id]);
    
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'email|required|unique:admins,email,' . $request->admin_id,
            'mobile' => 'required',
            'confirm_password' => 'same:password',
            'store_name' => 'required',
            'categories_ids' => 'required',
            'pan_number' => 'required',
            'commission' => 'required',
            'city_id' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);
    
        if ($validator->fails()) {
            Log::warning("Validation failed during seller update", ['errors' => $validator->errors()]);
            return CommonHelper::responseError($validator->errors()->first());
        }
    
        if (!isset($request->id)) {
            Log::warning("No seller ID provided in update request");
            return CommonHelper::responseSuccess("No seller ID provided.");
        }
    
        try {
            $record = Seller::find($request->id);
            if (!$record) {
                Log::warning("Seller not found", ['seller_id' => $request->id]);
                return CommonHelper::responseSuccess("Seller Not Found!");
            }
    
            $oldStatus = $record->status;
            DB::beginTransaction();
    
            $data = [
                'username' => $request->name,
                'email' => $request->email
            ];
    
            if (!empty($request->password)) {
                $data['password'] = bcrypt($request->password);
            }
    
            $admin = Admin::find($request->admin_id);
            if ($admin) {
                $admin->update($data);
                Log::info("Admin details updated", ['admin_id' => $admin->id]);
            } else {
                Log::warning("Admin not found for update", ['admin_id' => $request->admin_id]);
            }
    
            // Update Seller
            $record->fill([
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'store_name' => $request->store_name,
                'shop_opened_closed' => $request->input('shop_opened_closed', '1'),
                'store_url' => $request->store_url,
                'street' => $request->street,
                'pincode_id' => $request->pincode_id ?? 0,
                'city_id' => $request->city_id,
                'categories' => $request->categories_ids,
                'state' => $request->state,
                'account_number' => $request->account_number,
                'bank_ifsc_code' => $request->ifsc_code,
                'bank_name' => $request->bank_name,
                'account_name' => $request->account_name,
                'commission' => $request->commission,
                'tax_name' => $request->tax_name,
                'tax_number' => $request->tax_number,
                'pan_number' => $request->pan_number,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'place_name' => $request->place_name,
                'formatted_address' => $request->formatted_address,
                'store_description' => $request->store_description,
                'require_products_approval' => $request->require_products_approval,
                'customer_privacy' => $request->customer_privacy,
                'view_order_otp' => $request->view_order_otp,
                'assign_delivery_boy' => $request->assign_delivery_boy,
                'change_order_status_delivered' => $request->change_order_status_delivered,
                'status' => $request->status,
                'remark' => $request->remark,
                'slug' => Str::slug($request->name),
            ]);
    
            // Upload logo
            if ($request->hasFile('store_logo')) {
                $file = $request->file('store_logo');
                $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
                $record->logo = $image;
                Log::info("Store logo uploaded", ['filename' => $fileName]);
            }
    
            // Upload national ID
            if ($request->hasFile('national_id_card')) {
                $file = $request->file('national_id_card');
                $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
                $record->national_identity_card = $image;
                Log::info("National ID uploaded", ['filename' => $fileName]);
            }
    
            // Upload address proof
            if ($request->hasFile('address_proof')) {
                $file = $request->file('address_proof');
                $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('sellers', $file, $fileName);
                $record->address_proof = $image;
                Log::info("Address proof uploaded", ['filename' => $fileName]);
            }
    
            $record->save();
            Log::info("Seller record updated", ['seller_id' => $record->id]);
    
            $categories_ids = is_array($request->categories_ids)
                ? $request->categories_ids
                : explode(',', $request->categories_ids);
    
            foreach ($categories_ids as $category_id) {
                $existingCommission = SellerCommission::where('seller_id', $record->id)
                    ->where('category_id', $category_id)
                    ->first();
    
                if (!$existingCommission) {
                    $commission = new SellerCommission();
                    $commission->seller_id = $record->id;
                    $commission->category_id = $category_id;
                    $commission->save();
                    Log::info("Commission entry added", ['seller_id' => $record->id, 'category_id' => $category_id]);
                }
            }
    
            DB::commit();
    
            if ($oldStatus !== $record->status) {
                try {
                    CommonHelper::sendMailAdminStatus("seller", $record, $record->status, $request->email);
                    Log::info("Status change email sent", ['seller_id' => $record->id]);
                } catch (\Exception $e) {
                    Log::error("Error sending status update email", ['error' => $e->getMessage()]);
                }
            }
    
            return CommonHelper::responseSuccess("Seller Updated Successfully!");
        } catch (\Throwable $e) {
            
            DB::rollBack();
            Log::error("Error during seller update", ['error' => $e->getMessage()]);
            return CommonHelper::responseSuccess("Something went wrong. Please try again.");
        }
    }
    

    public function delete(Request $request){
        if(isset($request->id)){
            $seller = Seller::find($request->id);
            if($seller){
                @Storage::disk('public')->delete($seller->logo);
                @Storage::disk('public')->delete($seller->national_identity_card);
                @Storage::disk('public')->delete($seller->address_proof);
                $seller->delete();
                return CommonHelper::responseSuccess("Seller Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Seller Already Deleted!");
            }
        }
    }

    public function updateStatus(Request $request){
        if(isset($request->id)){
            $seller = Seller::find($request->id);
            if($seller){
                $seller->status = $request->status;
                $seller->remark = $request->remark ?? "";
                $seller->save();

                if(isset($request->status) && $request->status === Seller::$statusActive){
                    $status_name = Seller::$Active;
                }else{
                    $status_name = Seller::$Rejected;
                }
                /*$app_name = Setting::get_value('app_name');
                if(isset($request->status) && $request->status === 1){
                    $status = Seller::$Active;
                    $subject = "Your Account is ".$status."d";
                }else{
                    $status = Seller::$Rejected;
                    $subject = "Your Account is ".$status." by ".$app_name." Administrator!";
                }

                $data['type'] = "seller_status";
                $data['status_name'] = $status;
                $data['status'] = $seller->status;
                $data['subject'] = $subject;
                $data['seller'] = $seller;
                CommonHelper::sendMail($seller->email, $subject ,$data);*/
                $user = Admin::where('id',$seller->admin_id)->first();



                try {
                    CommonHelper::sendMailAdminStatus( "seller", $seller, $seller->status, $user->email);
                }catch ( \Exception $e){
                    Log::error("Approve Seller status send mail error",[$e->getMessage()] );
                }

                return CommonHelper::responseSuccess("Seller ".$status_name." Successfully!");
            }else{
                return CommonHelper::responseSuccess("Seller Not Found!");
            }
        }
    }

    public function updateCommission(){
        $date = date('Y-m-d');
        $result = OrderItem::select('categories.id as category_id', 'order_items.id', DB::raw('date(order_items.created_at) as order_date'),
            'order_items.order_id','order_items.product_variant_id','order_items.seller_id','order_items.sub_total','products.return_days')
            ->leftJoin('product_variants', 'order_items.product_variant_id', '=', 'product_variants.id')
            ->leftJoin('products', 'product_variants.product_id', '=', 'products.id')
            ->leftJoin('categories', 'products.category_id', '=', 'categories.id')
            ->where('order_items.active_status','=','delivered')
            ->where('order_items.is_credited','=', 0)
            ->where(DB::raw('DATE_ADD(DATE_FORMAT(order_items.created_at, "%Y-%m-%d"), INTERVAL products.return_days DAY)'),'<', $date)
            ->orderBy('order_items.id','DESC')
            ->get();
        //print_r($result);
        if (!empty($result) && $result->count() !== 0) {
            foreach ($result as $row) {
                $seller_info = Seller::select('commission', 'email', 'name')->where('id',$row['seller_id'])->first();
                $commission = SellerCommission::select('commission')->where('seller_id',$row['seller_id'])->where('category_id',$row['category_id'])->first();

                $commission_perct = isset($commission['commission']) && $commission['commission'] > 0 ? $commission['commission'] : $seller_info['commission'];
                $commission_amt = $row['sub_total'] / 100 * $commission_perct;
                $transfer_amt = $row['sub_total'] - $commission_amt;

                /* get seller balance */
                $balance = Seller::select('balance')->where('id',$row['seller_id'])->first();
                $user_wallet_balance = $balance["$balance"];
                $amt = ($transfer_amt + $user_wallet_balance);

                /* update seller commission */
                DB::beginTransaction();
                try {
                    $seller = Seller::find($row['seller_id']);
                    $seller->balance = $seller->balance + $amt;
                    $seller->save();

                    $order_item = OrderItem::find($row['id']);
                    $order_item->is_credited = 1;
                    $order_item->save();

                    $sellerWalletTransactions = new SellerWalletTransaction();
                    $sellerWalletTransactions->seller_id = $row['seller_id'];
                    $sellerWalletTransactions->type = 'credit';
                    $sellerWalletTransactions->amount = $transfer_amt;
                    $sellerWalletTransactions->message = 'Commission';
                    $sellerWalletTransactions->status = 1;
                    $sellerWalletTransactions->save();

                    /* send notification  */
                    $message = "Dear, " . ucwords($seller_info['name']) . " Commission for  order item  ID : #" . $row['id'] . " was transfered. Please take note of it.";
                    //$fn->send_notification_to_seller($row['seller_id'], "Commission Transfered", $message, 'order', $row['id'], $ignore_method = 1);

                } catch (\Exception $e) {
                    DB::rollBack();
                    Log::info("Error : ".$e->getMessage());
                    throw $e;
                    return CommonHelper::responseError("Something Went Wrong!");
                }
                return CommonHelper::responseSuccess("Seller(s) commission updated successfully");
            }
        } else {
            return CommonHelper::responseError("Seller(s) commission already updated");
        }

    }
    public function getSellerCommission(){
        $settings = Setting::where('variable', 'seller_commission')->first();
        if (!empty($settings) && $settings->count() !== 0) {
            return CommonHelper::responseWithData($settings);
        } else {
            return CommonHelper::responseError("Seller(s) commission not available");
        }

    }

    public function getSellerCommissionNotDefault($id){
    //I want sller commision to be fetched from the sellers table on the basis of seller_id on which I am currently updating the profile, I also want to send the seller_id from the route present inside the EditSellerProfile.vue file
        $seller_id = $id;
        $seller_commission = Seller::select('commission')->where('id',$seller_id)->first();
        if (!empty($seller_commission) && $seller_commission->count() !== 0) {
            return CommonHelper::responseWithData($seller_commission);
        } else {
            return CommonHelper::responseError("Seller(s) commission not available");
        }
    }


}
