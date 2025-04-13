<?php

namespace App\Http\Controllers\API;

use App\Helpers\CommonHelper;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Seller;
use App\Models\Setting;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class CategoryApiController extends Controller
{
    /*public function index(Request $request){}*/

    public function getCategories(Request $request){
        $limit = $request->input('limit'); // Default items per page
       // $offset = $request->input('offset', 0); // Default page
        $offset = (($request->input('offset'))-1)*$limit; // Default page
        $filter = $request->input('filter', ''); // Filter query
    
        if(isset(auth()->user()->seller->id) && auth()->user()->seller->id != null && auth()->user()->role_id == 3){
            $seller = auth()->user()->seller;
            $categoriesQuery = Category::whereIn('id', explode(",", $seller->categories))->orderBy('id', 'DESC');
        } else {
            $categoriesQuery = Category::orderBy('id', 'DESC');
        }
        
        if ($filter) {
            $categoriesQuery = $categoriesQuery->where(function($query) use ($filter) {
                $query->where('name', 'like', "%{$filter}%")
                      ->orWhere('subtitle', 'like', "%{$filter}%");
            });
        }
        $total = $categoriesQuery->count();
        if (isset($limit) && !is_null($limit)) {
            $categories = $categoriesQuery->skip($offset)->take($limit)->get();
        } else {
            $categories = $categoriesQuery->get();
        }
    
        if($categories->isEmpty()){
            return CommonHelper::responseError('Category not found.');
        }
    
        return CommonHelper::responseWithData($categories, $total);
    }

    public function getActiveCategories(){
        $categories = Category::where('status', 1)->orderBy('id','ASC')->get()->toArray();
        return CommonHelper::responseWithData($categories);
    }
    public function getMainCategories(Request $request){
        $categories = CommonHelper::getMainCategories($request);
        $total = $categories->count();
        if(empty($categories)){
            return  CommonHelper::responseError('Category not found.');
        }
        return CommonHelper::responseWithData($categories,$total);
    }
    public function getCategoriesByRowOrder(){
        $categories = Category::where('parent_id',0)->orderBy('row_order','ASC')->get();
        return CommonHelper::responseWithData($categories);
    }
   public function save(Request $request)
{
    Log::info('Save function called', ['request_data' => $request->all()]);

    $validator = Validator::make($request->all(), [
        'name' => 'required',
        'subtitle' => 'required',
        'image' => 'required|mimes:jpeg,jpg,png,gif'
    ]);

    if ($validator->fails()) {
        Log::error('Validation failed', ['errors' => $validator->errors()->toArray()]);
        return CommonHelper::responseError($validator->errors()->first());
    }

    // Generate slug from the title
    $slug = Str::slug($request->name);
    Log::info('Generated slug', ['slug' => $slug]);

    // Check for uniqueness
    $count = Category::where('slug', $slug)->count();
    Log::info('Slug count in DB', ['count' => $count]);

    if ($count > 0) {
        $slug .= '-' . ($count + 1);
        Log::info('Updated slug for uniqueness', ['new_slug' => $slug]);
    }

    $category = new Category();
    $category->name = $request->name;
    $category->subtitle = $request->subtitle;
    $category->slug = $slug;

    $image = '';
    if ($request->hasFile('image')) {
        Log::info('Image file detected', ['file_name' => $request->file('image')->getClientOriginalName()]);
        
        $file = $request->file('image');
        $fileName = time() . '_' . rand(1111, 99999) . '.' . $file->getClientOriginalExtension();
        
        try {
            $image = Storage::disk('public')->putFileAs('categories', $file, $fileName);
            Log::info('Image uploaded successfully', ['image_path' => $image]);
        } catch (\Exception $e) {
            Log::error('Image upload failed', ['error' => $e->getMessage()]);
        }
    }

    $category->image = $image;
    $category->web_image = '';
    $category->status = 1;
    $category->parent_id = $request->parent_id;

    try {
        $category->save();
        Log::info('Category saved successfully', ['category_id' => $category->id]);
        return CommonHelper::responseSuccess("Category Saved Successfully!");
    } catch (\Exception $e) {
        Log::error('Category save failed', ['error' => $e->getMessage()]);
        return CommonHelper::responseError('Failed to save category.');
    }
}
    public function update(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'subtitle' => 'required',
        ]);
        if ($validator->fails()) {
            return CommonHelper::responseError($validator->errors()->first());
        }
        if(isset($request->id)){
            $category = Category::find($request->id);
           
            $newSlug = Str::slug($request->name);
            $count = Category::where('slug', $newSlug)->where('id', '!=', $category->id) ->count();

            if ($count > 0) {
                $newSlug .= '-' . ($count + 1);
            }

            $category->name = $request->name;
            $category->subtitle = $request->subtitle;
            $category->status = $request->status;
            $category->slug = $newSlug;
            $category->parent_id = $request->parent_id;
            if($request->hasFile('image')){
                @Storage::disk('public')->delete($category->image);
                $file = $request->file('image');
                $fileName = time().'_'.rand(1111,99999).'.'.$file->getClientOriginalExtension();
                $image = Storage::disk('public')->putFileAs('categories', $file, $fileName);
                $category->image = $image;
            }
            $category->save();
        }
        
        return CommonHelper::responseSuccess("Category Updated Successfully!");
    }
    public function delete(Request $request){
        if(isset($request->id)){
            $category = Category::find($request->id);
            if($category){
                @Storage::disk('public')->delete($category->image);
                $category->delete();
                return CommonHelper::responseSuccess("Category Deleted Successfully!");
            }else{
                return CommonHelper::responseSuccess("Category Already Deleted!");
            }
        }
    }


    public function getOptions(Request  $request){
        echo"<option value='0' selected >Select Category</option>";
        $options = CommonHelper::categoryTree(0,'',null,array(), false,array(),$request->exclude_id,0);
    }

    public function updateCategoriesOrder(Request $request){
        $categories = $request->all();
        foreach ($categories as $key => $category){
            $data = Category::find($category["id"]);
            $data->row_order = $category["row_order"];
            $data->save();
        }
        return CommonHelper::responseSuccess("Category Order Updated Successfully!");
    }
    public function countProductCategoryWise(){
        $categories = Category::select('id','name',DB::raw('(SELECT count(id) from `products` WHERE products.category_id = categories.id) AS product_count'))
            ->orderBy('id','ASC')->get();
        return CommonHelper::responseWithData($categories);
    }

    public function getSellerCategories(Request $request){
        //$categories = CommonHelper::getSellerCategories($request->seller_id);
        //return CommonHelper::responseWithData($categories);

        CommonHelper::categoryTree(0,'',null,array(), true,array(),'', $request->seller_id);
    }
    public function checkSlug(Request $request, $slug)
    {
        try {
            // Query the database to count the documents that match the slug pattern
            $existingDocumentCount = Category::where('slug', 'like', $slug . '%')->count();

            // Construct the response data
            $responseData = [
                'unique' => $existingDocumentCount === 0,
                'count' => $existingDocumentCount
            ];

            // Return the response as JSON
            return response()->json($responseData);
        } catch (\Exception $e) {
            // Log the error
            \Log::error('Error checking slug uniqueness: ' . $e->getMessage());

            // Return an error response
            return response()->json(['error' => 'An error occurred while checking slug uniqueness'], 500);
        }
    }

}
