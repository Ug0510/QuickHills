<?php
    $appName = \App\Models\Setting::get_value('app_name');
    if($appName == "" || $appName == null){
        $appName = "eGrocer";
    }

    $supportEmail = \App\Models\Setting::get_value('support_email');
    if($supportEmail == "" || $supportEmail == null){
        $supportEmail = "";
    }
    $supportNumber = \App\Models\Setting::get_value('support_number');
    if($supportNumber == "" || $supportNumber == null){
        $supportNumber = "";
    }
    $logo = \App\Models\Setting::get_value('logo');
    $currency = \App\Models\Setting::get_value('currency') ?? '$';
?>

<?php if(\Request::route()->getName() == "customerInvoice"): ?>
<html>
    <head>
        <title>Invoice Order - <?php echo e($appName); ?></title>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="<?php echo e(asset('assets/css/bootstrap.css')); ?>">
        <link rel="stylesheet" href="<?php echo e(asset('assets/css/custom/common.css')); ?>">
        <style>
            body {
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body>
<?php endif; ?>
<style>
    address {
        margin-bottom: 1px;
        font-style: normal;
        line-height: 1.42857143;
    }
    p {
        margin: 0 0 0px;
    }
    .invoice {
        position: relative;
        background: #fff;
        border: 1px solid #f4f4f4;
        padding: 20px;
        margin: 10px 25px
    }
    .well {
        min-height: 20px;
        padding: 19px;
        margin-bottom: 20px;
        background-color: #f5f5f5;
        border: 1px solid #e3e3e3;
        border-radius: 4px;
        -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05)
    }
   
    @media  only screen and (max-width: 600px) {
        .invoice {
            padding: 0px !important;
            margin: 0px  !important;
        }
    }
</style>
<section class="invoice " id="printMe">
    
    <div class="d-flex justify-content-between align-items-center flex-wrap">
        <h5 class="page-header"><?php echo e($appName); ?></h5>
        <h5 class="page-header">Mo. <?php echo e($supportNumber); ?></h5>
    </div>
    <hr>
    <div class="d-flex justify-content-between align-items-center flex-wrap">
        <div class="invoice-col">
            From
            <address>
                <strong><?php echo e($appName); ?></strong>
            </address>
            <address>
                Email: <?php echo e($supportEmail); ?><br>
            </address>
            <address>
                Customer Care : <?php echo e($supportNumber); ?>

            </address>
            <address>
                Delivery By: <?php echo e($order->delivery_boy_name ?? ""); ?>

            </address>
        </div>
        <div class="invoice-col">
            Shipping Address
            <address>
                <strong><?php echo e($order->user_name ?? ""); ?></strong>
            </address>
            <address>
                <?php echo e($order->order_address ?? ""); ?><br>
            </address>
            <address>
                <strong><?php echo e($order->order_mobile); ?> / <?php echo e($order->alternate_mobile); ?> </strong><br>
            </address>
            <address>
                <strong><?php echo e($order->user_email); ?></strong><br>
            </address>
        </div>
        <div class=" invoice-col">
            Retail Invoice
            <address>
                <b>No : </b>#<?php echo e($order->order_item_id); ?>

            </address>
            <address>
                <b>Date: </b><?php echo e(\Carbon\Carbon::parse($order->orders_created_at)->format('d-m-y h:i A')); ?>

            </address>
            <address>
                <b>GST Number: </b> 05AABCQ0149G12T 
            </address>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-12">
            <div class="well">
                <div class="row"><strong>Item : <?php echo e(count($order_items)); ?></strong></div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="col-md-4">
                        <p>Sold By</p>
                        <strong><?php echo e($order->store_name); ?></strong>
                        <p>Name: <?php echo e($order->seller_name); ?></p>
                        <p>Email: <?php echo e($order->seller_email); ?></p>
                        <p>Mobile No. : <?php echo e($order->seller_mobile); ?></p>
                    </div>
                    <div class="col-md-3">
                        <strong>
                            <p>Pan Number : <?php echo e($order->pan_number); ?></p>
                            <p><?php echo e($order->tax_name); ?> : <?php echo e($order->tax_number); ?></p>
                        </strong>
                        <?php if($order->delivery_boy_name): ?>
                            <p>Delivery By : <?php echo e($order->delivery_boy_name ?? ""); ?></p>
                        <?php else: ?>
                            <p>Delivery By : Not Assigned</p>
                        <?php endif; ?>
                    </div>
                </div>
                <hr>
                <div class="row">
                    <p class="h6 ">Product Details:</p>
                    <div class="row">
                        <div class="col-xs-12 table-responsive">
                            <table class="table table-responsive">
                                <thead class="text-center">
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Name</th>
                                    <th>Unit</th>
                                    <th>Price</th>
                                    <th>Tax <?php echo e($currency); ?> (%)</th>
                                    <th>Qty</th>
                                    <th>SubTotal ( <?php echo e($currency); ?> )</th>
                                </tr>
                                </thead>
                                <tbody class="text-center">
                                <?php
                                    $total_tax_amount = 0;
                                    $total_quantity = 0;
                                    $total_sub_total = 0;
                                ?>
                                <?php $__currentLoopData = $order_items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <tr>
                                        <td><?php echo e($index+1); ?><br></td>
                                        <td><?php echo e($item->product_name); ?><br></td>
                                        <td><?php echo e($item->variant_name); ?><br></td>
                                        <td><?php echo e(($item->discounted_price != 0 && $item->discounted_price != "") ? $item->discounted_price : $item->price); ?></td>
                                        <td><?php echo e($item->tax_amount. "  (" .$item->tax_percentage."%)"); ?><br></td>
                                        <td><?php echo e($item->quantity); ?><br></td>
                                        <td><?php echo e($item->sub_total); ?><br></td>
                                        <?php
                                            $total_tax_amount = $total_tax_amount + $item->tax_amount;
                                            $total_quantity = $total_quantity + $item->quantity;
                                            $total_sub_total = $total_sub_total + $item->sub_total;
                                        ?>
                                    </tr>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </tbody>
                                <tfoot class="text-center">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th>Total</th>
                                    <td><?php echo e($total_tax_amount); ?><br></td>
                                    <td><?php echo e($total_quantity); ?><br></td>
                                    <td><?php echo e($total_sub_total); ?><br></td>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="d-flex justify-content-between">
        <p><b>Payment Method : </b> <?php echo e(strtoupper($order->payment_method)); ?></p>
        <!--accepted payments column
        <div class="col-xs-6 col-xs-offset-6">
        <p class="lead">Payment Date: </p>-->
        <div class="table-responsive">
            <table>
                <tbody>
                    <tr>
                        <th>Total Order Price (<?php echo e($currency); ?>)</th>
                        <td><?php echo e($order->total); ?></td>
                    </tr>
                    <tr>
                        <th>Delivery Charge (<?php echo e($currency); ?>)</th>
                        <td><?php echo e($order->delivery_charge); ?></td>
                    </tr>
                    <tr>
                        <th>Discount <?php echo e($currency); ?> (%)</th>
                        <?php
                            $discount_in_rupees = 0;
                            if ( $order->discount > 0) {
                                $discounted_amount = $order->total * $order->discount / 100;
                                $final_total = $order->total - $discounted_amount;
                                $discount_in_rupees = $order->total - $final_total;
                            }
                        ?>
                        <td><?php echo e('- ' . $discount_in_rupees . ' (' . $order->discount . '%)'); ?></td>
                    </tr>
                    <tr>
                        <th>Promo (<?php echo e($order->promo_code); ?>) Discount (<?php echo e($currency); ?>)</th>
                        <td><?php echo e('- ' . $order->promo_discount); ?></td>
                    </tr>
                    <tr>
                        <th>Wallet Used (<?php echo e($currency); ?>)</th>
                        <td><?php echo e('- ' . $order->wallet_balance); ?></td>
                    </tr>
                    <tr>
                        <th>Final Total (<?php echo e($currency); ?>)</th>
                        <td><?php echo e('= ' . $order->final_total); ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</section>
<?php if(\Request::route()->getName() == "customerInvoice"): ?>
    </body>
</html>
<?php endif; ?>
<?php /**PATH /home/u513106666/domains/quickhills.com/public_html/admin/resources/views/invoice.blade.php ENDPATH**/ ?>