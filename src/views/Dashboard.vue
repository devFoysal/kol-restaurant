<template>
<div>
    <Header></Header>
    <main class="dashboard">
        <div class="container-fluid">
            <div class="row">
                <div class="col-3 col-md-2">
                    <Navbar></Navbar>
                </div>
                <div class="col-9 col-md-10">
                    <div class="row justify-content-center">
                        <div class="col-12 col-md-10 col-lg-8">
                            <ul class="nav nav-tabs" id="orderTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" data-toggle="tab" href="#processing" role="tab" aria-controls="processing" aria-selected="true">Processing</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#complete" role="tab" aria-controls="complete" aria-selected="false">Complete</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="orderTabContent">
                                <div class="tab-pane fade show active" id="processing" role="tabpanel" aria-labelledby="processing-tab">
                                    <div class="filter-pane">
                                        <select name="filter_processing_order" id="filter-processing" class="brand-select" v-model="filterProcessingOrder">
                                            <option value="" selected>Filter</option>
                                            <option value="table">Table</option>
                                            <option value="pickup">Pickup</option>
                                        </select>
                                    </div>

                                    <!-- {{orderData | json}} -->

                                    <div class="order-box processing order-table">
                                        <!--                            Order Item -->
                                        <div v-for="order in orderData" :key="order.id">
                                            <div v-if="order.status > 0 && order.status < 4">
                                                <div class="order-meta-info">
                                                    <span v-if="order.order_type === 1">Order ID #{{order.id}} (Table {{order.table}})</span>
                                                    <span v-else>Order ID #{{order.id}} (Pickup)</span>
                                                    <span>{{timeAgo(order.created_at)}}</span>
                                                </div>

                                                <div>
                                                    <div class="order-card new">
                                                        <span class="order-type-icon">
                                                            <img v-if="order.order_type == 1" src="@/assets/images/icons/icon-order-table.svg">
                                                            <img v-else src="@/assets/images/icons/icon-order-pack.svg">
                                                        </span>

                                                        <div v-for="participant in order.order_participants" :key="participant.user.id">
                                                            <div v-for="orderItem in order.orderItems" :key="orderItem.id">
                                                                <div v-for="sharePerson in orderItem.shared_with" :key="sharePerson.id">
                                                                    <div v-if="sharePerson === participant.user.id">

                                                                        <div class="customer-name">{{participant.user.name}} <span v-if="orderItem.added_by == participant.user.id" class="customer-type-icon">
                                                                                <img src="@/assets/images/icons/icon-customer-type.svg"></span>
                                                                        </div>

                                                                        <div class="order-item">
                                                                            <div class="name-price">
                                                                                <div class="item-name text-capitalize">{{orderItem.food_item_name}} <span v-if="orderItem.order_item_add_ons.length > 0">(+Add on)</span></div>
                                                                                <div class="item-price">SAR {{orderItem.food_item_price}}</div>
                                                                            </div>
                                                                            <div class="quantity">
                                                                                <span>{{orderItem.quantity}} pcs</span>
                                                                            </div>
                                                                            <div class="subtotal">
                                                                                <div class="label">Subtotal</div>
                                                                                <div class="subtotal-amount">SAR {{(orderItem.quantity * orderItem.food_item_price) + addonTotal(orderItem.order_item_add_ons) * orderItem.quantity}}</div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div class="order-action">
                                                            <!-- <a href="" class="btn btn-brand-styled-bordered" data-toggle="modal" data-target="#orderDetailsModal"><span>View Details</span></a> -->
                                                            <a href="" class="btn btn-brand-styled-bordered" data-toggle="modal" @click="orderDetailsModal(order)"><span>View Details</span></a>
                                                            <a href="" class="btn btn-brand-styled-bordered" data-toggle="modal" v-if="order.order_type == 1" data-target="#confirmPaymentModal"><span>View Payment</span></a>
                                                            <a href="" class="btn btn-brand-styled-bordered" data-toggle="modal" v-else @click="notifyCustomer(order.id)"><span>Notify</span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="tab-pane fade" id="complete" role="tabpanel" aria-labelledby="complete-tab">
                                    <div class="filter-pane">
                                        <select name="filter-complete-order" id="filter-complete" class="brand-select" v-model="filterProcessingOrder">
                                            <option value="" selected>Filter</option>
                                            <option value="table">Table</option>
                                            <option value="pickup">Pickup</option>
                                        </select>
                                    </div>

                                    <div class="order-box complete order-table">
                                        <!--                            Order Item -->
                                        <div class="order-meta-info duration-segment">
                                            <span>Today</span>
                                        </div>

                                        <div v-for="order in orderData" :key="order.id">

                                            <div class="order-card" v-if="order.status == 4">
                                                <!-- order item-->
                                                <span class="order-type-icon">
                                                    <img v-if="order.order_type == 1" src="@/assets/images/icons/icon-order-table.svg">
                                                    <img v-else src="@/assets/images/icons/icon-order-pack.svg">
                                                </span>
                                                <div class="order-item">
                                                    <div class="name-price order-id">
                                                        <div class="item-name" v-if="order.order_type === 1">Order ID #{{order.id}} (Table {{order.table}})</div>
                                                        <div class="item-name" v-else>Order ID #{{order.id}} (Pickup)</div>
                                                        <div class="item-price">SAR 46</div>
                                                    </div>
                                                    <div class="order-meta-details">
                                                        <div class="time">Time: 03:40pm</div>
                                                        <div class="shared">Shared with: Nick Wade and Beatrice Meyer</div>
                                                    </div>
                                                </div>
                                                <div class="order-action">
                                                    <a href="" class="btn btn-block" @click="completeOrderDetailsModal(order)" data-toggle="modal" data-target="#invoiceModal">
                                                        <span>View Receipt</span>
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        <!-- <div class="order-card">
                                            <span class="order-type-icon">
                                                <img src="@/assets/images/icons/icon-order-pack.svg">
                                            </span>
                                            <div class="order-item">
                                                <div class="name-price order-id">
                                                    <div class="item-name">Order ID #765689 (Pickup)</div>
                                                    <div class="item-price">SAR 38</div>
                                                </div>
                                                <div class="order-meta-details">
                                                    <div class="time">Time: 03:40pm</div>
                                                    <div class="shared">Shared with: Nick Wade and Beatrice Meyer</div>
                                                </div>
                                            </div>
                                            <div class="order-action">
                                                <a href="" class="btn btn-block" data-toggle="modal" data-target="#invoiceModal">
                                                    <span>View Receipt</span>
                                                </a>
                                            </div>
                                        </div> -->

                                        <!-- <div class="order-meta-info duration-segment">
                                            <span>05-June-19</span>
                                        </div> -->

                                        <!-- <div class="order-card">
                                            <span class="order-type-icon">
                                                <img src="@/assets/images/icons/icon-order-table.svg">
                                            </span>
                                            <div class="order-item">
                                                <div class="name-price order-id">
                                                    <div class="item-name">Order ID #765689 (Table A1)</div>
                                                    <div class="item-price">SAR 36</div>
                                                </div>
                                                <div class="order-meta-details">
                                                    <div class="time">Time: 03:40pm</div>
                                                    <div class="shared">Shared with: Nick Wade and Beatrice Meyer</div>
                                                </div>
                                            </div>
                                            <div class="order-action">
                                                <a href="" class="btn btn-block" data-toggle="modal" data-target="#invoiceModal"><span>View Receipt</span></a>
                                            </div>
                                        </div>

                                        <div class="order-card">
                                            <span class="order-type-icon">
                                                <img src="@/assets/images/icons/icon-order-pack.svg">
                                            </span>
                                            <div class="order-item">
                                                <div class="name-price order-id">
                                                    <div class="item-name">Order ID #765689 (Pickup)</div>
                                                    <div class="item-price">SAR 52</div>
                                                </div>
                                                <div class="order-meta-details">
                                                    <div class="time">Time: 03:40pm</div>
                                                    <div class="shared">Shared with: Nick Wade and Beatrice Meyer</div>
                                                </div>
                                            </div>
                                            <div class="order-action">
                                                <a href="" class="btn btn-block" data-toggle="modal" data-target="#invoiceModal">
                                                    <span>View Receipt</span>
                                                </a>
                                            </div>
                                        </div> -->

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--    Modals -->
        <div class="modal container-fluid fade" id="orderDetailsModal" tabindex="-1" role="dialog" aria-labelledby="orderDetailsModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-8">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg">
                                </div>
                                <div class="order-details-modal">
                                    <!--                                order item -->
                                    <!-- orderModalData -->
                                    <!-- <div v-if="orderModalData.id === odrItems.order"></div> -->
                                    <div v-for="participant in orderModalData.order_participants" :key="participant.user.id">

                                        <div v-for="odrItems in orderModalData.orderItems" :key="odrItems.id">

                                            <div v-for="sharePerson in odrItems.shared_with" :key="sharePerson.id">
                                                <div v-if="sharePerson === participant.user.id">

                                                    <div class="customer-name">{{participant.user.name}} <span v-if="odrItems.added_by == participant.user.id" class="customer-type-icon">
                                                            <img src="@/assets/images/icons/icon-customer-type.svg"></span>
                                                    </div>

                                                    <div class="order-card">
                                                        <div class="order-item">
                                                            <div class="name-price">
                                                                <div class="item-name text-capitalize">{{odrItems.food_item_name}}</div>
                                                                <div class="item-price">SAR {{odrItems.food_item_price}}</div>
                                                            </div>
                                                            <div class="quantity">
                                                                <span>{{odrItems.quantity}} pcs</span>
                                                            </div>
                                                            <div class="attributes">
                                                                <div class="property">
                                                                    Add On -
                                                                </div>
                                                                <div class="value">
                                                                    <div class="attribute-item" v-for="(orderAddOns, index) in odrItems.order_item_add_ons" :key="index">
                                                                        <div class="prop-label">
                                                                            {{orderAddOns.food_add_on_details.name}}
                                                                        </div>
                                                                        <div class="prop-value">
                                                                            +{{orderAddOns.food_add_on_details.price}}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div class="attributes" v-for="attribute in odrItems.order_item_attribute_matrices" :key="attribute.id">
                                                                <div class="property">
                                                                    {{attribute.food_attribute_matrix_details.attribute_name}}
                                                                </div>
                                                                <div class="value">
                                                                    {{attribute.food_attribute_matrix_details.name}}
                                                                </div>
                                                            </div>

                                                            <div class="attributes">
                                                                <div class="property">
                                                                    Shared With:
                                                                </div>
                                                                <div class="value">
                                                                    <span>
                                                                        {{participant.user.name}}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div class="subtotal">
                                                                <div class="label">Subtotal</div>
                                                                <div class="subtotal-amount">SAR {{(odrItems.quantity * odrItems.food_item_price) + addonTotal(odrItems.order_item_add_ons) * odrItems.quantity}}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="confirmPaymentModal" tabindex="-2" role="dialog" aria-labelledby="confirmPaymentModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-8">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg">
                                </div>
                                <div class="confirm-payment-modal">

                                    <div v-for="payment in paymentDetails" :key="payment.id">
                                        <div class="customer-row" :class="payment.has_paid ? paid:undecided">
                                            <div class="customer-detail">
                                                <div class="customer-avatar">
                                                    <img :src="payment.user.profile_picture">
                                                </div>
                                                <div class="name-amount">
                                                    <h6 class="name">{{payment.user.name}}</h6>
                                                    <span class="amount">SAR {{payment.amount}}</span>
                                                </div>
                                            </div>
                                            <div class="payment-status" v-if="payment.has_paid">
                                                <span>Paid with PayTabs</span>
                                                <label class="checkbox-brand-circle">
                                                    <input type="checkbox" checked disabled name="menu-item-status">
                                                    <span class="checkbox-brand-bg">
                                                    </span>
                                                </label>
                                            </div>
                                            <div class="payment-status" v-else>
                                                <span>Pending</span>
                                                <img src="@/assets/images/icons/icon-payment-undecided.svg">
                                            </div>
                                        </div>
                                    </div>

                                    <!-- <div class="customer-row paid">
                                        <div class="customer-detail">
                                            <div class="customer-avatar">
                                                <img src="@/assets/images/customer/avatar-2.svg">
                                            </div>
                                            <div class="name-amount">
                                                <h6 class="name">Nick Wade</h6>
                                                <span class="amount">SAR 38</span>
                                            </div>
                                        </div>
                                        <div class="payment-status">
                                            <span>Paid with PayTabs</span>
                                            <img src="@/assets/images/icons/icon-payment-paid.svg">

                                            <label class="checkbox-brand-circle">
                                                <input type="checkbox" checked disabled name="menu-item-status">
                                                <span class="checkbox-brand-bg">
                                                </span>
                                            </label>
                                        </div>
                                    </div> -->
                                    <!-- 
                                    <div class="customer-row decided">
                                        <div class="customer-detail">
                                            <div class="customer-avatar">
                                                <img src="@/assets/images/customer/avatar-3.svg">
                                            </div>
                                            <div class="name-amount">
                                                <h6 class="name">Doris Mendoza</h6>
                                                <span class="amount">SAR 79</span>
                                            </div>
                                        </div>
                                        <div class="payment-status">
                                            <span>Will pay via cash</span>
                                            <img src="@/assets/images/icons/icon-payment-to-be-done.svg">
                                            <label class="checkbox-brand-circle">
                                                <input type="checkbox" name="menu-item-status">
                                                <span class="checkbox-brand-bg">
                                                </span>
                                            </label>
                                        </div>
                                    </div> -->
                                    <!-- <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                                        <span>Received Payment</span>
                                    </a> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="notifyModal" tabindex="-3" role="dialog" aria-labelledby="notifyModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-8">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg">
                                </div>
                                <div class="notify-modal">
                                    <div class="status">
                                        <label class="radio-brand">
                                            <input type="radio" name="order-status" value="ready-soon" id="ready-soon" checked>
                                            <span class="radio-brand-view"></span>
                                        </label>
                                        <label for="ready-soon">The order will be ready in</label>
                                        <select name="order-ready-duration" class="brand-select-minimal" v-model="orderStatus">
                                            <option value="" selected>Select time</option>
                                            <option value="10">10 min</option>
                                            <option value="20">20 min</option>
                                            <option value="30">30 min</option>
                                        </select>
                                    </div>

                                    <div class="status">
                                        <label class="radio-brand">
                                            <input type="radio" name="order-status" value="ready" id="ready" v-model="orderStatus">
                                            <span class="radio-brand-view"></span>
                                        </label>
                                        <label for="ready">The order is ready</label>
                                    </div>

                                    <div class="status">
                                        <label class="radio-brand-red">
                                            <input type="radio" name="order-status" value="delivered" id="delivered" v-model="orderStatus">
                                            <span class="radio-brand-view"></span>
                                        </label>
                                        <label for="delivered">Delivered</label>
                                    </div>

                                    <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered" @click.prevent="sendNotificationToCustomer()">
                                        <span>Submit</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="invoiceModal" tabindex="-4" role="dialog" aria-labelledby="invoiceModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-8">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg">
                                </div>
                                <div class="invoice-modal">
                                    <div class="restaurant-info">
                                        <h4 class="name">
                                            Caesars Palace Las Vegas Hotel <br>
                                            and two line example
                                        </h4>
                                        <p class="address">King Saud Rd, Riyadh 11481, Saudi Arabia</p>
                                    </div>
                                    <div class="invoice-info">
                                        <div class="date-time">
                                            Date: 02 jan 19 <br>
                                            Time: 22:32:40
                                        </div>
                                        <div class="invoice-no">
                                            Invoice No.568935635 <br>
                                            Order ID #765689
                                        </div>
                                    </div>

                                    <div v-for="participant in completeOrderModalData.order_participants" :key="participant.user.id">
                                        <div v-for="odrItems in completeOrderModalData.orderItems" :key="odrItems.id">
                                            <div v-for="sharePerson in odrItems.shared_with" :key="sharePerson.id">
                                                <div v-if="sharePerson === participant.user.id">
                                                    <!--                                order details-->

                                                    <div class="customer-name">{{participant.user.name}} <span v-if="odrItems.added_by == participant.user.id" class="customer-type-icon">
                                                            <img src="@/assets/images/icons/icon-customer-type.svg"></span>
                                                    </div>

                                                    <div class="order-card">
                                                        <div class="order-item">
                                                            <div class="name-price">
                                                                <div class="item-name text-capitalize">{{odrItems.food_item_name}}</div>
                                                                <div class="item-price">SAR {{odrItems.food_item_price}}</div>
                                                            </div>
                                                            <div class="quantity">
                                                                <span>{{odrItems.quantity}} pcs</span>
                                                            </div>
                                                            <div class="attributes">
                                                                <div class="property">
                                                                    Add On -
                                                                </div>
                                                                <div class="value">
                                                                    <div class="attribute-item" v-for="(orderAddOns, index) in odrItems.order_item_add_ons" :key="index">
                                                                        <div class="prop-label">
                                                                            {{orderAddOns.food_add_on_details.name}}
                                                                        </div>
                                                                        <div class="prop-value">
                                                                            +{{orderAddOns.food_add_on_details.price}}
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div class="attributes" v-for="attribute in odrItems.order_item_attribute_matrices" :key="attribute.id">
                                                                <div class="property">
                                                                    {{attribute.food_attribute_matrix_details.attribute_name}}
                                                                </div>
                                                                <div class="value">
                                                                    {{attribute.food_attribute_matrix_details.name}}
                                                                </div>
                                                            </div>

                                                            <div class="attributes">
                                                                <div class="property">
                                                                    Shared With:
                                                                </div>
                                                                <div class="value">
                                                                    <span>
                                                                        {{participant.user.name}}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <div class="subtotal">
                                                                <div class="label">Subtotal</div>
                                                                <div class="subtotal-amount">SAR {{(odrItems.quantity * odrItems.food_item_price) + addonTotal(odrItems.order_item_add_ons)}}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="payment-details">
                                        <div class="pay-type">
                                            <div class="pay-label">Pay type</div>
                                            <div class="pay-amount">Amount</div>
                                        </div>
                                        <div class="via-card">
                                            <div class="card-label">Card</div>
                                            <div class="card-amount">SAR 92</div>
                                        </div>
                                        <div class="via-cash">
                                            <div class="cash-label">Cash</div>
                                            <div class="cash-amount">SAR 98</div>
                                        </div>
                                    </div>

                                    <div class="totals">
                                        <div class="subtotal">
                                            <div class="subtotal-label">Subtotal</div>
                                            <div class="subtotal-amount">SAR 45</div>
                                        </div>
                                        <div class="tax">
                                            <div class="tax-label">Tax</div>
                                            <div class="tax-amount">SAR 62</div>
                                        </div>
                                        <div class="total">
                                            <div class="total-label">Total</div>
                                            <div class="total-amount">SAR 45</div>
                                        </div>
                                    </div>

                                    <a href="#" data-dismiss="modal" class="btn btn-block print">Print</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>
</template>

<style lang="less">
main.dashboard {
    padding-top: 100px;

    #orderTab {
        background-color: #fff;
        display: flex;
        box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
        border-radius: 6px;
        border: 0;
        overflow: hidden;

        .nav-item {
            display: inline-block;
            width: 50%;
            text-align: center;
            border: 0;

            .nav-link,
            .nav-link.active {
                font-size: 15px;
                font-weight: 500;
                line-height: 23px;
                color: #B4BBC9;
                padding: 18px;
                border: 0;
                border-radius: 0;
                position: relative;

                &:after {
                    content: '';
                    display: inline-block;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    height: 6px;
                    width: 100%;
                    background-color: #449AA3;
                    opacity: 0;
                    transition: 0.3s ease-in-out;
                }
            }

            .nav-link.active {
                color: #449AA3;

                &:after {
                    opacity: 1;
                }
            }
        }
    }

    .filter-pane {
        margin: 20px 0;
        text-align: right;
    }

    .order-box {
        .order-meta-info {
            font-size: 13px;
            line-height: 14px;
            font-weight: 500;
            color: #454F63;
            display: flex;
            align-items: center;
            justify-content: space-between;
            opacity: 0.6;
        }

        .order-card {
            margin: 10px 0 30px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
            padding: 2rem 6rem;
            position: relative;

            &:before {
                content: '';
                display: inline-block;
                position: absolute;
                top: 0;
                left: 0;
                width: 4px;
                height: 100%;
                background-color: #449AA3;
                transition: 0.3s ease-in-out;
                opacity: 0;
            }

            .order-type-icon {
                position: absolute;
                left: 1.5rem;
            }

            .customer-name {
                font-size: 14px;
                line-height: 14px;
                color: #A6AEBE;
                background-color: #F7F7FA;
                display: inline-block;
                padding: 5px 10px;
                border-radius: 30px;

                .customer-type-icon {
                    img {
                        vertical-align: baseline;
                    }
                }
            }

            .order-item {
                margin-top: 5px;

                .name-price {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .item-name {
                        font-size: 16px;
                        line-height: 25px;
                        font-weight: 500;
                        color: #3E3E3E;

                        span {
                            color: #B4BBC9;
                        }
                    }

                    .item-price {
                        font-size: 16px;
                        line-height: 25px;
                        font-weight: 500;
                        color: #3E3E3E;
                    }
                }

                .quantity {
                    font-size: 16px;
                    line-height: 25px;
                    font-weight: 500;
                    color: #3E3E3E;
                    text-align: right;
                }

                .subtotal {
                    margin: 10px 0 20px;
                    padding-top: 10px;
                    font-size: 16px;
                    line-height: 25px;
                    font-weight: 500;
                    color: #3E3E3E;
                    border-top: 1px solid #B4BBC9;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
            }

            .order-action {
                margin-top: 10px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                a.btn.btn-brand-styled-bordered {
                    display: block;
                    width: 48%;
                    text-align: center;
                    color: #449AA3;
                    font-size: 16px;
                    line-height: 20px;
                    text-transform: none;

                    &:first-child {
                        background-color: #E2EBF0;

                        &:before,
                        &:after {
                            background-color: #E2EBF0;
                        }
                    }
                }
            }
        }

        .order-card.new {
            &:before {
                opacity: 1;
            }
        }
    }

    .order-box.complete {
        .order-card {
            margin: 10px 0 15px;
            padding: 2rem 6rem 0.3rem;

            &:hover {
                &:before {
                    opacity: 0;
                }
            }

            .order-type-icon {
                top: 2.3rem;
            }

            .order-id {
                margin-bottom: 5px;
            }

            .order-meta-details {
                font-size: 12px;
                line-height: 18px;
                color: #78849E;
                padding-bottom: 20px;
                border-bottom: 1px solid rgba(180, 187, 201, 0.2);
            }

            .order-action {
                margin-top: 0;

                .btn {
                    background-color: transparent;
                    border: 0;
                    color: #449AA3;
                    font-size: 12px;
                    padding: 1rem .75rem;

                    &:focus {
                        outline: 0;
                        box-shadow: none;
                    }
                }
            }
        }

        .order-card+.order-meta-info.duration-segment {
            margin-top: 30px;
        }
    }

    //  modal styles
    .modal {
        .modal-dialog {
            max-width: inherit;
            margin: 6rem auto;

            .custom-row {
                margin: 0;

                .modal-content {
                    border: 1px solid transparent;
                    border-radius: 10px;

                    .modal-body {
                        padding: 3rem 0;
                        position: relative;

                        .close-modal {
                            display: inline-block;
                            position: absolute;
                            top: 35px;
                            right: 30px;
                            cursor: pointer;
                        }

                        .order-details-modal,
                        .invoice-modal {
                            padding: 2rem 4rem;

                            //  order item styles
                            .customer-name {
                                font-size: 14px;
                                line-height: 14px;
                                font-weight: 500;
                                color: #A6AEBE;
                                opacity: 0.6;
                            }

                            .order-card {
                                border-radius: 10px;
                                border: 1px solid #439AA1;
                                margin: 10px 0 20px;
                                padding: 2rem;

                                .order-item {
                                    .name-price {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;

                                        .item-name,
                                        .item-price {
                                            font-size: 16px;
                                            line-height: 25px;
                                            font-weight: 500;
                                            color: #3E3E3E;
                                        }
                                    }

                                    .quantity {
                                        font-size: 16px;
                                        line-height: 25px;
                                        font-weight: 500;
                                        color: #3E3E3E;
                                        text-align: right;
                                    }

                                    .attributes {
                                        font-size: 12px;
                                        line-height: 22px;
                                        display: flex;
                                        margin-top: 10px;

                                        .property {
                                            color: #454F63;
                                            flex-basis: 20%;
                                        }

                                        .value {
                                            color: #B4BBC9;
                                            flex-basis: 80%;

                                            .attribute-item {
                                                display: flex;
                                                align-items: center;
                                                justify-content: space-between;
                                            }
                                        }
                                    }

                                    .subtotal {
                                        padding-top: 10px;
                                        margin-top: 1rem;
                                        border-top: 1px solid #439AA1;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        font-size: 16px;
                                        line-height: 25px;
                                        font-weight: 500;
                                        color: #3E3E3E;
                                    }
                                }
                            }
                        }

                        .confirm-payment-modal {
                            padding: 2rem 4rem 0;

                            .customer-row {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-bottom: 20px;

                                .customer-detail {
                                    display: flex;
                                    flex-basis: 60%;

                                    .customer-avatar {
                                        width: 48px;
                                        height: 48px;
                                        overflow: hidden;
                                        border-radius: 48px;
                                        margin-right: 15px;

                                        img {
                                            width: 100%;
                                        }
                                    }

                                    .name-amount {
                                        display: flex;
                                        flex-direction: column;
                                        justify-content: center;

                                        .name {
                                            font-size: 16px;
                                            line-height: 25px;
                                            font-weight: 500;
                                            margin-bottom: 0;
                                            color: #454F63;
                                        }

                                        .amount {
                                            font-size: 12px;
                                            line-height: 18px;
                                            color: #454F63;
                                            opacity: 0.6;
                                            margin-top: -2px;
                                        }
                                    }
                                }

                                .payment-status {
                                    display: flex;
                                    align-items: center;
                                    font-size: 14px;
                                    line-height: 21px;

                                    img {
                                        margin-left: 10px;
                                    }
                                }
                            }

                            .customer-row.paid {
                                .customer-detail {
                                    .customer-avatar {
                                        border: 2px solid #449AA3;
                                    }
                                }

                                .payment-status {
                                    span {
                                        color: #454F63;
                                        opacity: 0.6;
                                    }
                                }
                            }

                            .customer-row.decided {
                                .payment-status {
                                    span {
                                        color: #44A377;
                                    }
                                }
                            }

                            .customer-row.undecided {
                                .payment-status {
                                    span {
                                        color: #FF6969;
                                    }
                                }
                            }

                            .btn.btn-brand-styled-bordered {
                                text-transform: none;
                                display: block;
                                width: 70%;
                                margin: 0 auto;
                            }
                        }

                        .notify-modal {
                            padding: 2rem 4rem 0;

                            .status {
                                font-size: 15px;
                                color: #454F63;

                                label[for] {
                                    margin-bottom: 0;
                                }

                                label.radio-brand,
                                label.radio-brand-red {
                                    vertical-align: sub;
                                    margin-right: 10px;
                                }
                            }

                            .status+.status {
                                margin-top: 1.5rem;
                            }

                            .btn.btn-brand-styled-bordered {
                                text-transform: none;
                                display: block;
                                width: 70%;
                                margin: 2rem auto 0;
                            }
                        }

                        .invoice-modal {
                            .restaurant-info {
                                .name {
                                    font-size: 20px;
                                    line-height: 30px;
                                    font-weight: 500;
                                    color: #454F63;
                                    text-align: center;
                                }

                                .address {
                                    font-size: 15px;
                                    line-height: 23px;
                                    color: #A6AEBE;
                                    text-align: center;
                                }
                            }

                            .invoice-info {
                                border-top: 1px solid #439AA1;
                                border-bottom: 1px solid #439AA1;
                                padding: 5px 0;
                                font-size: 14px;
                                line-height: 25px;
                                font-weight: 500;
                                color: #454F63;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                margin-bottom: 25px;

                                .invoice-no {
                                    text-align: right;
                                }
                            }

                            .customer-detail {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;

                                .customer-paid-via {
                                    font-size: 14px;
                                    line-height: 14px;
                                    font-weight: 500;
                                    color: #A6AEBE;
                                    opacity: 0.6;
                                }
                            }

                            .payment-details {
                                font-size: 16px;
                                line-height: 28px;
                                font-weight: 500;
                                color: #3E3E3E;
                                border-top: 1px solid #439AA1;
                                border-bottom: 1px solid #439AA1;
                                padding: 15px 0;
                                margin-top: 30px;

                                .pay-type,
                                .via-card,
                                .via-cash {
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                }
                            }

                            .totals {
                                font-size: 16px;
                                line-height: 28px;
                                font-weight: 500;
                                color: #3E3E3E;
                                padding: 15px 0;
                                margin-top: 5px;

                                .subtotal,
                                .tax,
                                .total {
                                    display: flex;
                                    align-items: center;
                                    justify-content: space-between;
                                }

                                .total {
                                    padding-top: 10px;
                                    margin-top: 10px;
                                    border-top: 1px solid #439AA1;
                                }
                            }

                            .print {
                                font-size: 16px;
                                line-height: 20px;
                                font-weight: 500;
                                color: #439AA1;
                                background-color: #ECF5F6;
                                border-radius: 40px;
                                margin-top: 2rem;
                                padding: 0.6rem .75rem;

                                &:focus {
                                    outline: 0;
                                    box-shadow: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

html[dir='rtl'] {
    main.dashboard {
        .filter-pane {
            text-align: left;
        }

        .modal {
            .modal-dialog {
                .custom-row {
                    .modal-content {
                        .modal-body {
                            .close-modal {
                                right: auto;
                                left: 30px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
import Bootstrap from 'bootstrap';

import axios from 'axios';

import config from '../config';

import Navbar from '@/components/Navbar.vue';

import Header from '@/components/Header.vue';

import $ from 'jquery';

// import { initializeFirebase } from '../firebase';

import firebase from "firebase/app";
import "firebase/messaging";

export default {
    name: 'Dashboard',
    component: {
        Bootstrap,
    },
    data() {
        return {
            orders: [],
            orderItems: [],
            orderModalData: {},
            completeOrderModalData: {},
            MONTH_NAMES: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            filterProcessingOrder: "",
            orderStatus: "",
            orderId: '',
            paymentDetails: [],
            fcmNotification:{}
            // orderData: [

            //     {
            //         "id": 391,
            //         "order_type": 0,
            //         "restaurant": 84,
            //         "table": null,
            //         "order_item_set": [
            //             320,321
            //         ],
            //         "order_participants": [{
            //                 "user": {
            //                     "id": 104,
            //                     "name": "Ashik",
            //                     "phone_number": "+8801515652027",
            //                     "profile_picture": null
            //                 },
            //                 "created_at": "2019-11-16 13:11:41",
            //                 "order": 391
            //             },
            //             {
            //                 "user": {
            //                     "id": 105,
            //                     "name": "Foysa",
            //                     "phone_number": "+8801515652027",
            //                     "profile_picture": null
            //                 },
            //                 "created_at": "2019-11-16 13:11:41",
            //                 "order": 391
            //             }
            //         ],
            //         "confirmed": true,
            //         "status": 3,
            //         "created_by": 104,
            //         "created_at": "2019-11-16 13:11:41",
            //         "orderItems": [{
            //             "id": 320,
            //             "order": 391,
            //             "food_item": 77,
            //             "food_item_price": "100.000",
            //             "food_item_name": "Shwarma wrap",
            //             "food_item_calorie": 250,
            //             "quantity": 1,
            //             "order_item_add_ons": [

            //             ],
            //             "order_item_attribute_matrices": [

            //             ],
            //             "status": 1,
            //             "shared_with": [
            //                 104
            //             ],
            //             "total_price": 100,
            //             "shared_price": 100,
            //             "added_by": 104,
            //             "created_at": "2019-11-16 13:11:22"
            //         },
            //         {
            //             "id": 321,
            //             "order": 391,
            //             "food_item": 77,
            //             "food_item_price": "100.000",
            //             "food_item_name": "Shwarma wrap 2",
            //             "food_item_calorie": 250,
            //             "quantity": 2,
            //             "order_item_add_ons": [

            //             ],
            //             "order_item_attribute_matrices": [

            //             ],
            //             "status": 1,
            //             "shared_with": [
            //                 105
            //             ],
            //             "total_price": 100,
            //             "shared_price": 100,
            //             "added_by": 104,
            //             "created_at": "2019-11-16 13:11:22"
            //         }]
            //     },
            //     {
            //         "id": 390,
            //         "order_type": 0,
            //         "restaurant": 84,
            //         "table": null,
            //         "order_item_set": [
            //             319
            //         ],
            //         "order_participants": [{
            //                 "user": {
            //                     "id": 104,
            //                     "name": "Ashik",
            //                     "phone_number": "+8801515652027",
            //                     "profile_picture": null
            //                 },
            //                 "created_at": "2019-11-16 08:11:38",
            //                 "order": 390
            //             },
            //             {
            //                 "user": {
            //                     "id": 106,
            //                     "name": "Naim",
            //                     "phone_number": "+8801515652027",
            //                     "profile_picture": null
            //                 },
            //                 "created_at": "2019-11-16 08:11:38",
            //                 "order": 390
            //             },
            //             {
            //                 "user": {
            //                     "id": 107,
            //                     "name": "Jahidul",
            //                     "phone_number": "+8801515652027",
            //                     "profile_picture": null
            //                 },
            //                 "created_at": "2019-11-16 08:11:38",
            //                 "order": 390
            //             }
            //         ],
            //         "confirmed": true,
            //         "status": 3,
            //         "created_by": 104,
            //         "created_at": "2019-11-16 08:11:38",
            //         "orderItems": [
            //             {
            //             "id": 319,
            //             "order": 390,
            //             "food_item": 178,
            //             "food_item_price": "450.000",
            //             "food_item_name": "Berger",
            //             "food_item_calorie": 1,
            //             "quantity": 2,
            //             "order_item_add_ons": [{
            //                     "id": 148,
            //                     "food_add_on": 84,
            //                     "food_add_on_details": {
            //                         "id": 84,
            //                         "food": 178,
            //                         "name": "addon 2",
            //                         "price": "55.000"
            //                     },
            //                     "created_at": "2019-11-16 08:11:49"
            //                 },
            //                 {
            //                     "id": 147,
            //                     "food_add_on": 83,
            //                     "food_add_on_details": {
            //                         "id": 83,
            //                         "food": 178,
            //                         "name": "addon 1",
            //                         "price": "20.000"
            //                     },
            //                     "created_at": "2019-11-16 08:11:49"
            //                 }
            //             ],
            //             "order_item_attribute_matrices": [{
            //                     "id": 86,
            //                     "food_attribute_matrix": 77,
            //                     "food_attribute_matrix_details": {
            //                         "id": 77,
            //                         "name": "level 1",
            //                         "attribute": 55,
            //                         "attribute_name": "attribute 1"
            //                     },
            //                     "created_at": "2019-11-16 08:11:49"
            //                 },
            //                 {
            //                     "id": 87,
            //                     "food_attribute_matrix": 76,
            //                     "food_attribute_matrix_details": {
            //                         "id": 76,
            //                         "name": "level 2",
            //                         "attribute": 54,
            //                         "attribute_name": "attribute 2"
            //                     },
            //                     "created_at": "2019-11-16 08:11:49"
            //                 }
            //             ],
            //             "status": 1,
            //             "shared_with": [
            //                 104, 107
            //             ],
            //             "total_price": 1010,
            //             "shared_price": 1010,
            //             "added_by": 104,
            //             "created_at": "2019-11-16 08:11:49"
            //         }]
            //     },
            //     {
            //         "id": 386,
            //         "order_type": 1,
            //         "restaurant": 84,
            //         "table": 67,
            //         "order_item_set": [
            //             317
            //         ],
            //         "order_participants": [
            //             {
            //                 "user": {
            //                     "id": 104,
            //                     "name": "Ashik",
            //                     "phone_number": "+8801515652027",
            //                     "profile_picture": null
            //                 },
            //                 "created_at": "2019-11-16 08:11:38",
            //                 "order": 390
            //             },
            //         ],
            //         "confirmed": true,
            //         "status": 4,
            //         "created_by": 104,
            //         "created_at": "2019-11-16 06:11:33",
            //         "orderItems": [{
            //             "id": 317,
            //             "order": 386,
            //             "food_item": 177,
            //             "food_item_price": "244.000",
            //             "food_item_name": "Pizza",
            //             "food_item_calorie": 1,
            //             "quantity": 2,
            //             "order_item_add_ons": [{
            //                 "id": 145,
            //                 "food_add_on": 81,
            //                 "food_add_on_details": {
            //                     "id": 81,
            //                     "food": 177,
            //                     "name": "addon 1",
            //                     "price": "324.000"
            //                 },
            //                 "created_at": "2019-11-16 06:11:43"
            //             }],
            //             "order_item_attribute_matrices": [{
            //                 "id": 84,
            //                 "food_attribute_matrix": 75,
            //                 "food_attribute_matrix_details": {
            //                     "id": 75,
            //                     "name": "level 1",
            //                     "attribute": 53,
            //                     "attribute_name": "attribute 1"
            //                 },
            //                 "created_at": "2019-11-16 06:11:43"
            //             }],
            //             "status": 1,
            //             "shared_with": [
            //                 104
            //             ],
            //             "total_price": 1136,
            //             "shared_price": 1136,
            //             "added_by": 104,
            //             "created_at": "2019-11-16 06:11:43"
            //         }]
            //     }
            // ]
        }
    },
    mounted() {
        // initializeFirebase();
        this.getOrderItem();
        this.getOrder();
        this.getOrderParticipant();

        this.getAccountCustomer();

        
// const firebaseConfig = {
//   apiKey: "AIzaSyATFb48zOVkgD7F0l_k6bv58nl4sJ5iNs0",
//   authDomain: "kole-application.firebaseapp.com",
//   databaseURL: "https://kole-application.firebaseio.com",
//   projectId: "kole-application",
//   storageBucket: "kole-application.appspot.com",
//   messagingSenderId: "737498888975",
//   appId: "1:737498888975:web:50d8d2cc8904f0c3819c7a",
//   measurementId: "G-RQKLYK3EEY"
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// messaging.usePublicVapidKey(
//   "BCVTu7QCq_KFug_Fdpc-jpRK62w6efiVJwEeubPKz8ddGdjbXH1qV-7lg_S3M11seaP1tYmd5v2iQ7iHxRPmd7M"
// );

this.getRegToken()
        // this.getFCMMessage();      
    },
    methods: {

        // getFCMMessage() {
        //     var settings = {
        //         "async": true,
        //         "crossDomain": false,
        //         "url": "https://fcm.googleapis.com/fcm/send?=",
        //         "method": "POST",
        //         "headers": {
        //             "Content-Type": "application/json",
        //             "Authorization": "key=AIzaSyDsOgz0q83vbv1rJlOfV0EUsAkLXnaTH0Q",
        //             "Accept": "*/*",
        //             "Cache-Control": "no-cache",
        //             "Postman-Token": "7570aca6-1356-4651-b12a-0c8a91834ea8,9ba52096-3938-4c0e-ba94-eed922957903",
        //             "cache-control": "no-cache"
        //         },
        //         "processData": false,
        //         "data": "{\n\t\"to\":\"ctXoAhXrpzTdDEtBLlwA7U:APA91bGdCSl4YnrtBdDAcv2xh4vJm1T0-UzIpEqRyrdj8bU-WgWVi82f682uxNl2AEuUwv7huq1KA7xTaQQBTyUdqQuq2j7rPuplr_4eCDEstD-p_kydh8xCzAVTlcCtbGDqb8QkIfKk\",\n\t\"content_available\":true,\n\t\"notification\":{\n\t\t\"title\":\"FOOD ORDER\",\n\t\t\"body\":\"yo\",\n\t\t\"click_action\":\"http://localhost:8080/dashboard\"\n\t},\n\t\"data\":{\n\t\t\"extra\":\"order\"\n\t}\n}"
        //     }

        //     axios(settings).then((response) => {
        //         console.log('FCM Ajax request',response);
        //     }).catch(err => console.log(err));
        // },

        getRegToken() {
            messaging
                .getToken()
                .then(currentToken => {
                    if (currentToken) {
                        console.log(currentToken);
                        this.sendTokenToServer(currentToken);
                    } else {
                        // Show permission request.
                        console.log("No Instance ID token available. Request permission to generate one.");
                        // Show permission UI.
                        this.setTokenSentToServer(false);
                    }
                })
                .catch(err => {
                    console.log("An error occurred while retrieving token. ", err);
                    // this.showToken("Error retrieving Instance ID token. ", err);
                    this.setTokenSentToServer(false);
                });
        },

        sendTokenToServer(currentToken) {
            if (!this.isTokenSentToServer()) {
                console.log("Sending token to server...");
                // TODO(developer): Send the current token to your server.
                this.setTokenSentToServer(true);
            } else {
                console.log("Token already sent to server so won't send it again " + "unless it changes");
            }
        },

        setTokenSentToServer(sent) {
            window.localStorage.setItem("sentToServer", sent ? "1" : "0");
        },

        isTokenSentToServer() {
            return window.localStorage.getItem("sentToServer") === "1";
        },

        getOrder() {
            const Token = JSON.parse(window.localStorage.getItem('kol_keys')).access;
            const that = this;
            const limit = 50;
            const offset = 0;
            axios({
                method: 'get',
                url: `${config.base_url}order/?limit=100`,
                headers: {
                    Authorization: `JWT ${Token}`,
                },
            }).then(response => {
                if (response.status === 200) {
                    this.orders = response.data.results
                    console.log('Get order', response.data.results);
                }
            }).catch(err => console.log(err));
        },

        getOrderItem() {
            const Token = JSON.parse(window.localStorage.getItem('kol_keys')).access;
            const that = this;
            const limit = 50;
            const offset = 0;
            axios({
                method: 'get',
                url: `${config.base_url}order-item/?limit=50`,
                headers: {
                    Authorization: `JWT ${Token}`,
                },
            }).then(response => {
                if (response.status === 200) {
                    this.orderItems = response.data.results;
                    console.log('Get order items', response.data.results);
                }
            }).catch(err => console.log(err));
        },

        getOrderParticipant() {

            const Token = JSON.parse(window.localStorage.getItem('kol_keys')).access;
            const that = this;
            const limit = 50;
            const offset = 0;
            axios({
                method: 'get',
                url: `${config.base_url}order-participant`,
                headers: {
                    Authorization: `JWT ${Token}`,
                },
            }).then(response => {
                if (response.status === 200) {
                    // console.log('Get order participant', response.data.results);
                }
            }).catch(err => console.log(err));
        },

        getAccountCustomer() {
            const Token = JSON.parse(window.localStorage.getItem('kol_keys')).access;
            const that = this;
            const limit = 50;
            const offset = 0;
            axios({
                method: 'get',
                url: `${config.base_url}account/customer-misc/`,
                headers: {
                    Authorization: `JWT ${Token}`,
                },
            }).then(response => {
                if (response.status === 200) {
                    // console.log('Get account customer', response.data.results);
                }
            }).catch(err => console.log(err));
        },

        orderDetailsModal(order) {
            $('#orderDetailsModal').modal('show');
            this.orderModalData = order;
            console.log('modal order data', order)
        },

        completeOrderDetailsModal(order) {
            // $('#orderDetailsModal').modal('show');
            this.completeOrderModalData = order;
            this.getInvoiceByOrder(order.id);
            console.log('modal complete order data', order)
        },

        addonTotal(addons) {
            return addons.reduce((total, addon) => {
                return total + parseInt(addon.food_add_on_details.price);
            }, 0);
        },

        notifyCustomer(order) {
            this.orderId = order;
            $('#notifyModal').modal('show');
        },

        sendNotificationToCustomer() {
            if (this.orderStatus != '' && this.orderStatus != 'ready' && this.orderStatus != 'delivered') {
                this.sendNotificationOrderIsTime(this.orderId, this.orderStatus)
            } else if (this.orderStatus === 'ready') {
                this.sendNotificationOrderIsReady(this.orderId)
            } else if (this.orderStatus === 'delivered') {
                this.sendNotificationOrderIsDeliverd(this.orderId)
            }
        },

        sendNotificationOrderIsTime(orderId, orderStatus) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            axios({
                    method: "post",
                    url: `${config.base_url}order/${orderId}/send_order_is_ready_in_x_notification/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: {
                        'time': orderStatus
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
        },

        sendNotificationOrderIsReady(orderId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            axios({
                    method: "post",
                    url: `${config.base_url}order/${orderId}/send_order_is_ready_notification/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: {
                        'sure': true
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });

        },
        sendNotificationOrderIsDeliverd(orderId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            axios({
                    method: "post",
                    url: `${config.base_url}order/${orderId}/send_order_is_delivered_notification/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: {
                        'sure': true
                    }
                })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error.response);
                });
        },

        getInvoiceByOrder(orderId) {
            const Token = JSON.parse(window.localStorage.getItem('kol_keys')).access;

            axios({
                method: 'get',
                url: `${config.base_url}invoice/${orderId}/`,
                headers: {
                    Authorization: `JWT ${Token}`,
                },
            }).then(response => {
                console.log('order invoice', response)
            }).catch(err => console.log(err));
        },
        getFormattedDate(date, prefomattedDate = false, hideYear = false) {
            const day = date.getDate();
            const month = this.MONTH_NAMES[date.getMonth()];
            const year = date.getFullYear();
            const hours = date.getHours();
            let minutes = date.getMinutes();

            if (minutes < 10) {
                // Adding leading zero to minutes
                minutes = `0${ minutes }`;
            }

            if (prefomattedDate) {
                // Today at 10:20
                // Yesterday at 10:20
                return `${ prefomattedDate } at ${ hours }:${ minutes }`;
            }

            if (hideYear) {
                // 10. January at 10:20
                return `${ day }. ${ month } at ${ hours }:${ minutes }`;
            }

            // 10. January 2017. at 10:20
            return `${ day }. ${ month } ${ year }. at ${ hours }:${ minutes }`;
        },

        timeAgo(dateParam) {
            if (!dateParam) {
                return null;
            }

            const date = typeof dateParam === "object" ? dateParam : new Date(dateParam);
            const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
            const today = new Date();
            const yesterday = new Date(today - DAY_IN_MS);
            const seconds = Math.round((today - date) / 1000);
            const minutes = Math.round(seconds / 60);
            const isToday = today.toDateString() === date.toDateString();
            const isYesterday = yesterday.toDateString() === date.toDateString();
            const isThisYear = today.getFullYear() === date.getFullYear();

            if (seconds < 5) {
                return "now";
            } else if (seconds < 60) {
                return `${seconds} seconds ago`;
            } else if (seconds < 90) {
                return "about a minute ago";
            } else if (minutes < 60) {
                return `${minutes} minutes ago`;
            } else if (isToday) {
                return this.getFormattedDate(date, "Today"); // Today at 10:20
            } else if (isYesterday) {
                return this.getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
            } else if (isThisYear) {
                return this.getFormattedDate(date, false, true); // 10. January at 10:20
            }

            return this.getFormattedDate(date); // 10. January 2017. at 10:20
        },

        viewPayment(orderId) {
            this.getPaymentInfo(orderId)
        },

        getPaymentInfo(orderId) {
            const Token = JSON.parse(window.localStorage.getItem('kol_keys')).access;

            axios({
                method: 'get',
                url: `${config.base_url}order/${orderId}/payment_info/`,
                headers: {
                    Authorization: `JWT ${Token}`,
                },
            }).then(response => {
                this.paymentDetails = response.data
                console.log('payment info', response)
            }).catch(err => console.log(err));
        }

    },
    updated() {
        console.log('computed', this.orderData)
    },
    components: {
        Header,
        Navbar,
    },
    computed: {
        orderData() {
            if (this.filterProcessingOrder === '') {
                let results = this.orders.map(order => {
                    return {
                        ...order,
                        orderItems: this.orderItems.filter(odrItem => odrItem.order === order.id)
                    }
                })
                return results;
            } else if (this.filterProcessingOrder.toLowerCase() == 'table') {

                let tableOrder = this.orders.filter(order => order.order_type == 1);

                let results = tableOrder.map(order => {
                    return {
                        ...order,
                        orderItems: this.orderItems.filter(odrItem => odrItem.order === order.id)
                    }
                })

                return results;

            } else if (this.filterProcessingOrder.toLowerCase() == 'pickup') {
                let tableOrder = this.orders.filter(order => order.order_type == 0);

                let results = tableOrder.map(order => {
                    return {
                        ...order,
                        orderItems: this.orderItems.filter(odrItem => odrItem.order === order.id)
                    }

                })

                return results;
            }

        }
    }
};
</script>
