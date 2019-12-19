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
                            <div class="profile-card">
                                <div class="cover-photo-container">
                                    <img class="cover-photo" :src="userData.cover_picture" />
                                </div>
                                <div class="profile-info-container">
                                    <div class="profile-info">
                                        <div class="avatar">
                                            <img v-if="user.profile_picture" :src="user.profile_picture" />
                                            <img v-if="!user.profile_picture" src="@/assets/images/default-user-profile.png" />
                                        </div>
                                        <div class="details">
                                            <h4 class="name">{{user.name}}</h4>
                                            <p class="type" v-if="userData.restaurant_type_details">{{userData.restaurant_type_details.name}}</p>
                                            <p class="address">{{userData.full_address}}</p>
                                            <div class="rating">
                                                <div class="stars">
                                                    <span v-if="userData.rating <= 0">
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                    </span>
                                                    <span v-if="userData.rating > 0 && userData.rating < 2">
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                    </span>
                                                    <span v-if="userData.rating >= 2 && userData.rating < 3">
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                    </span>
                                                    <span v-if="userData.rating >= 3 && userData.rating < 4">
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                    </span>
                                                    <span v-if="userData.rating >= 4 && userData.rating < 4.6">
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-off.svg" class="star" />
                                                    </span>

                                                    <span v-if="userData.rating >= 4.6">
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                        <img src="@/assets/images/icons/icon-star-on.svg" class="star" />
                                                    </span>

                                                </div>
                                                <div class="point">({{userData.rating}})</div>
                                            </div>
                                        </div>
                                    </div>
                                    <a data-toggle="modal" data-target="#profileModal" class="btn btn-brand-minimal">
                                        <img src="@/assets/images/icons/icon-pencil-brand.svg" />
                                        {{strings.edit[lang]}}
                                    </a>
                                </div>
                            </div>

                            <a data-toggle="modal" data-target="#addCategoryModal" class="btn btn-block create-category">{{strings.create_category[lang]}}</a>

                            <div class="category-card" v-for="(category, i) in foodCategories" v-bind:key="i">
                                <div class="category-header">
                                    <div class="name">{{category.name}}</div>
                                    <div class="action">
                                        <a data-toggle="modal" data-target="#deleteCategoryModal" class="btn category-action delete" v-on:click="setFoodCategoryIdToDelete(category.id)">
                                            <img src="@/assets/images/icons/icon-trash-red.svg" />
                                            {{strings.delete_category[lang]}}
                                        </a>

                                        <a data-toggle="modal" data-target="#editCategoryModal" class="btn category-action" v-on:click="setFoodCategoryIdToEdit(category.id, category.name)">
                                            <img src="@/assets/images/icons/icon-pencil-brand.svg" />
                                            {{strings.edit_category[lang]}}
                                        </a>

                                        <a data-toggle="modal" @click="addItemModal()" v-on:click="foodItemToBeSavedToCategory = category.id" class="btn category-action">
                                            <img src="@/assets/images/icons/icon-plus.svg" />
                                            {{strings.add_item[lang]}}
                                        </a>
                                    </div>
                                </div>
                                <div class="items-wrapper">
                                    <div class="text-center small" v-if="foodItems.filter((item) => item.category === category.id)
                         .length === 0">{{strings.no_food_item[lang]}}</div>
                                    <div class="category-item" v-bind:key="j" v-for="(foodItem, j) in
                         foodItems.filter((item) => item.category === category.id)">
                                        <div class="item-detail">
                                            <img class="category-thumb" :src="foodItem.picture" />
                                            <div class="item-info">
                                                <h6 class="name">{{foodItem.name}}</h6>
                                                <div class="price">{{strings.price[lang]}} SAR {{foodItem.price}}</div>
                                            </div>
                                        </div>
                                        <div class="action">
                                            <label class="checkbox-brand">
                                                <input type="checkbox" name="menu-item-status" v-model="foodItem.is_active" :checked="foodItem.is_active" v-on:click="isActiveItem(foodItem.id)" />
                                                <span class="checkbox-brand-outer">
                                                    <span class="checkbox-brand-inner"></span>
                                                </span>
                                            </label>

                                            <a href="#" class="btn" data-toggle="modal" data-target="#deleteItemModal" v-on:click="setFoodItemToDelete(foodItem.id)">
                                                <img src="@/assets/images/icons/icon-trash-red.svg" />
                                            </a>
                                            <a href="#" class="btn" data-toggle="modal" v-on:click="setFoodItemToEdit(foodItem.id)">
                                                <img src="@/assets/images/icons/icon-pencil-brand.svg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--    Modals -->
        <div class="modal container-fluid fade" id="profileModal" tabindex="-1" role="dialog" aria-labelledby="profileModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-6">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close-w.svg" />
                                </div>
                                <div class="image-container">
                                    <img class="cover-photo" v-if="userData.cover_picture  && !userDataToUpdate.coverPhoto" :src="userData.cover_picture" />
                                    <img class="cover-photo" v-if="!userData.cover_picture  && !userDataToUpdate.coverPhoto" src="@/assets/images/sign-in-bg.png" />
                                    <img class="cover-photo" v-if="userDataToUpdate.coverPhoto !== null" :src="userDataToUpdate.coverPhoto" />
                                    <div class="overlay">
                                        <label class="file-input" for="coverPhoto">
                                            <img src="@/assets/images/icons/icon-upload.svg" />
                                            {{strings.upload_image[lang]}}
                                        </label>
                                        <input type="file" id="coverPhoto" accept="image/x-png, image/jpeg" v-on:change="previewCoverPhoto($event)" />
                                    </div>
                                </div>

                                <div class="info-container">
                                    <div class="profile-photo">
                                        <img class="profile-pic" v-if="user.profile_picture && !userDataToUpdate.profilePhoto" :src="user.profile_picture" />
                                        <img class="profile-pic" v-if="!user.profile_picture && !userDataToUpdate.profilePhoto" src="@/assets/images/default-user-profile.png" />
                                        <img class="profile-pic" v-if="userDataToUpdate.profilePhoto !== null" :src="userDataToUpdate.profilePhoto" />
                                        <div class="overlay">
                                            <label class="file-input" for="profilePhoto">
                                                <img src="@/assets/images/icons/icon-upload.svg" />
                                            </label>
                                            <input type="file" id="profilePhoto" accept="image/x-png, image/jpeg" v-on:change="previewProfilePhoto($event)" />
                                        </div>
                                    </div>

                                    <div id="profile-form">
                                        <label>{{strings.restaurant_name[lang]}}</label>
                                        <input type="text" class="form-control" name="name" v-model="userDataToUpdate.name" />
                                        <label>{{strings.restaurant_type[lang]}}</label>
                                        <select name="type" class="form-control" v-model="userDataToUpdate.type">
                                            <option value>Type</option>
                                            <option v-for="category in restaurantCategories" :value="category.id" v-bind:key="category.id">{{category.name}}</option>
                                        </select>

                                        <label>{{strings.restaurant_address[lang]}}</label>
                                        <input type="text" class="form-control" name="address" placeholder="Address" v-model="userDataToUpdate.fullAddress" />
                                        <div class="form-action">
                                            <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                                                <span>{{strings.cancel[lang]}}</span>
                                            </a>
                                            <a v-on:click="updateUserData($event)" class="btn btn-brand-styled-bordered">
                                                <span>{{strings.save[lang]}}</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="addCategoryModal" tabindex="-1" role="dialog" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-6">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg" />
                                </div>

                                <div id="category-form">
                                    <input type="text" class="form-control" name="name" :placeholder="strings.category_name[lang]" v-model="newFoodCategoryName" />
                                    <div class="form-action">
                                        <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                                            <span>{{strings.cancel[lang]}}</span>
                                        </a>
                                        <a class="btn btn-brand-styled-bordered" v-on:click="addFoodCategory($event)">
                                            <span>{{strings.save[lang]}}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="editCategoryModal" tabindex="-1" role="dialog" aria-labelledby="editCategoryModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-6">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg" />
                                </div>

                                <div id="edit-category-form">
                                    <input type="text" class="form-control" name="name" :placeholder="strings.category_name[lang]" v-model="newFoodCategoryName" />
                                    <div class="form-action">
                                        <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                                            <span>{{strings.cancel[lang]}}</span>
                                        </a>
                                        <a class="btn btn-brand-styled-bordered" v-on:click="editFoodCategory()">
                                            <span>{{strings.save[lang]}}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="deleteCategoryModal" tabindex="-1" role="dialog" aria-labelledby="deleteCategoryModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-4">
                            <div class="modal-body">
                                <h5>{{strings.r_u_sure[lang]}}</h5>
                                <div class="modal-action">
                                    <a href="#" data-dismiss="modal" v-on:click="clearFoodCategoryIdToDelete()" class="btn btn-brand-styled-bordered">
                                        <span>{{strings.cancel[lang]}}</span>
                                    </a>
                                    <a v-on:click="deleteFoodCategory(foodCategoryToDelete)" class="btn btn-brand-styled-bordered">
                                        <span>{{strings.delete[lang]}}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="addItemModal" tabindex="-1" role="dialog" aria-labelledby="addItemModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-8">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg" />
                                </div>

                                <div action="#" id="addItem">
                                    <div class="item-thumb-upload" v-bind:class="{ 'has-image' : newFoodItem.picture !== '' }">
                                        <!-- class="has-image" when there is image
                      uploaded already-->
                                        <img class="item-thumb" :src="newFoodItem.picture" />
                                        <div class="overlay">
                                            <label class="file-input" for="itemThumb">
                                                <img v-if="newFoodItem.picture === ''" src="@/assets/images/icons/icon-image-upload-brand.svg" />
                                                <img v-if="newFoodItem.picture !== ''" src="@/assets/images/icons/icon-image-upload-white.svg" />
                                            </label>
                                            <input type="file" id="itemThumb" v-on:change="previewFoodPhoto($event)" />
                                        </div>
                                    </div>

                                    <div class="item-name">
                                        <input type="text" class="form-control" name="item-name" :placeholder="strings.item_name[lang]" v-model="newFoodItem.name" />
                                    </div>

                                    <div class="calory-price">
                                        <input type="text" class="form-control" name="item-calorie" :placeholder="strings.calorie[lang]" v-model="newFoodItem.calorie" />
                                        <input type="text" class="form-control" name="item-price" :placeholder="strings.price[lang]" v-model="newFoodItem.price" />
                                    </div>

                                    <div class="add-on-container">
                                        <a href="#" class="btn btn-brand-minimal add-item" v-on:click="addFoodAddOn()">
                                            <img src="@/assets/images/icons/icon-plus.svg" />
                                            {{strings.add_on[lang]}}
                                        </a>
                                    </div>

                                    <div class="add-on-items">
                                        <div class="add-on-item" v-for="(addon, i) in newFoodItem.addons_display" v-bind:key="i">
                                            <input type="text" class="form-control" :placeholder="strings.add_on[lang]" v-model="addon.name" />
                                            <input type="text" class="form-control" :placeholder="strings.price[lang]" v-model="addon.price" />
                                            <a href="#" class="btn remove-addon" v-on:click="removeAddOn(i)">
                                                <img src="@/assets/images/icons/icon-trash-red.svg" />
                                            </a>
                                        </div>
                                    </div>

                                    <div class="attributes-container">
                                        <a href="#" class="btn btn-brand-minimal add-attribute" v-on:click="addAttribute()">
                                            <img src="@/assets/images/icons/icon-plus.svg" />
                                            {{strings.add_attribute[lang]}}
                                        </a>
                                    </div>

                                    <div class="attributes-items">
                                        <div class="attribute-item" v-for="(attribute, i) in newFoodItem.attributes_display" v-bind:key="i">
                                            <div class="attribute">
                                                <input type="text" class="form-control" :placeholder="strings.attribute_label[lang]" v-model="attribute.name" />
                                                <a href="#" class="btn btn-brand-minimal add-matrix" v-on:click="addMatrix(i)">
                                                    <img src="@/assets/images/icons/icon-plus.svg" />
                                                    {{strings.add_matrix[lang]}}
                                                </a>
                                                <a href="#" class="btn remove-attribute" v-on:click="removeAttribute(i)">
                                                    <img src="@/assets/images/icons/icon-trash-red.svg" />
                                                </a>
                                            </div>
                                            <div class="matrix" v-for="(matrix,j) in attribute.attribute_matrix" v-bind:key="j">
                                                <input type="text" class="form-control" :placeholder="strings.level[lang]" v-model="matrix.name" />
                                                <a href="#" class="btn remove-matrix" v-on:click="removeMatrix(i,j)">
                                                    <img src="@/assets/images/icons/icon-trash-red.svg" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-action">
                                        <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered" v-on:click="clearNewFoodItem()">
                                            <span>{{strings.cancel[lang]}}</span>
                                        </a>
                                        <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered" v-on:click="addFoodItem($event)">
                                            <span>{{strings.save[lang]}}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="editItemModal" tabindex="-1" role="dialog" aria-labelledby="editItemModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-8">
                            <div class="modal-body">
                                <div class="close-modal" data-dismiss="modal">
                                    <img src="@/assets/images/icons/icon-modal-close.svg" />
                                </div>

                                <div action="#" id="editItem">
                                    <div class="item-thumb-upload" v-bind:class="{ 'has-image' : newFoodItem.picture !== '' }">
                                        <!-- class="has-image" when there is image
                      uploaded already-->
                                        <img class="item-thumb" :src="newFoodItem.picture" />
                                        <div class="overlay">
                                            <label class="file-input" for="itemThumb">
                                                <img v-if="newFoodItem.picture === ''" src="@/assets/images/icons/icon-image-upload-brand.svg" />
                                                <img v-if="newFoodItem.picture !== ''" src="@/assets/images/icons/icon-image-upload-white.svg" />
                                            </label>
                                            <input type="file" id="itemeEditThumb" v-on:change="previewFoodPhoto($event)" />
                                        </div>
                                    </div>

                                    <div class="item-name">
                                        <input type="text" class="form-control" name="item-name" :placeholder="strings.item_name[lang]" v-model="newFoodItem.name" />
                                    </div>

                                    <div class="calory-price">
                                        <input type="text" class="form-control" name="item-calorie" :placeholder="strings.calorie[lang]" v-model="newFoodItem.calorie" />
                                        <input type="text" class="form-control" name="item-price" :placeholder="strings.price[lang]" v-model="newFoodItem.price" />
                                    </div>

                                    <div class="add-on-container">
                                        <a href="#" class="btn btn-brand-minimal add-item" v-on:click="addFoodAddOn()">
                                            <img src="@/assets/images/icons/icon-plus.svg" />
                                            {{strings.add_on[lang]}}
                                        </a>
                                    </div>

                                    <div class="add-on-items">
                                        <div class="add-on-item" v-for="(addon, i) in newFoodItem.addons_display" v-bind:key="i">
                                            <input type="text" class="form-control" :placeholder="strings.add_on[lang]" v-model="addon.name" />
                                            <input type="text" class="form-control" :placeholder="strings.price[lang]" v-model="addon.price" />
                                            <a href="#" class="btn remove-addon" v-on:click="removeAddOn(i, addon.id)">
                                                <img src="@/assets/images/icons/icon-trash-red.svg" />
                                            </a>
                                        </div>
                                    </div>

                                    <div class="attributes-container">
                                        <a href="#" class="btn btn-brand-minimal add-attribute" v-on:click="addAttribute()">
                                            <img src="@/assets/images/icons/icon-plus.svg" />
                                            {{strings.add_attribute[lang]}}
                                        </a>
                                    </div>

                                    <div class="attributes-items">
                                        <div class="attribute-item" v-for="(attribute, i) in newFoodItem.attributes_display" v-bind:key="i">
                                            <div class="attribute">
                                                <input type="text" class="form-control" :placeholder="strings.attribute_label[lang]" v-model="attribute.name" />
                                                <a href="#" class="btn btn-brand-minimal add-matrix" v-on:click="addMatrix(i)">
                                                    <img src="@/assets/images/icons/icon-plus.svg" />
                                                    {{strings.add_matrix[lang]}}
                                                </a>
                                                <a href="#" class="btn remove-attribute" v-on:click="removeAttribute(i, attribute.id)">
                                                    <img src="@/assets/images/icons/icon-trash-red.svg" />
                                                </a>
                                            </div>
                                            <div class="matrix" v-for="(matrix,j) in attribute.attribute_matrix" v-bind:key="j">
                                                <input type="text" class="form-control" :placeholder="strings.level[lang]" v-model="matrix.name" />
                                                <a href="#" class="btn remove-matrix" v-on:click="removeMatrix(i,j, matrix.id)">
                                                    <img src="@/assets/images/icons/icon-trash-red.svg" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="modal-action">
                                        <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                                            <span>{{strings.cancel[lang]}}</span>
                                        </a>
                                        <a href="#" data-dismiss="modal" v-on:click="editFoodItem()" class="btn btn-brand-styled-bordered">
                                            <span>{{strings.save[lang]}}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal container-fluid fade" id="deleteItemModal" tabindex="-1" role="dialog" aria-labelledby="deleteItemModalLabel" aria-hidden="true">
            <div class="row">
                <div class="col-3 col-md-2"></div>
                <div class="modal-dialog col-9 col-md-10" role="document">
                    <div class="row justify-content-center custom-row">
                        <div class="modal-content col-12 col-md-10 col-lg-4">
                            <div class="modal-body">
                                <h5>{{strings.r_u_sure[lang]}}</h5>
                                <div class="modal-action">
                                    <a href="#" data-dismiss="modal" v-on:click="foodItemToDelete = ''" class="btn btn-brand-styled-bordered">
                                        <span>{{strings.cancel[lang]}}</span>
                                    </a>
                                    <a v-on:click="deleteFoodItem()" class="btn btn-brand-styled-bordered">
                                        <span>{{strings.delete[lang]}}</span>
                                    </a>
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
.profile-card {
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
    overflow: hidden;

    .cover-photo-container {
        height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        img.cover-photo {
            display: block;
            width: 100%;
        }
    }

    .profile-info-container {
        background-color: #fff;
        padding: 1.5rem 3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .profile-info {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .avatar {
                margin-right: 20px;

                img {
                    max-width: 64px;
                    max-height: 64px;
                }
            }

            .details {
                .name {
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: 500;
                    color: #3e3e3e;
                    margin-bottom: 5px;
                }

                .type,
                .address {
                    font-size: 12px;
                    line-height: 18px;
                    color: #b4bbc9;
                    margin-bottom: 0;
                }

                .rating {
                    display: flex;
                    align-items: center;

                    .stars {
                        margin-right: 5px;
                    }

                    .point {
                        font-size: 10px;
                        font-weight: 500;

                        color: #454f63;
                    }
                }
            }
        }

        .btn-brand-minimal {
            min-width: 120px;
            font-size: 14px;
            color: #439aa1;
            border: 1px solid #439aa1;
            border-radius: 40px;

            img {
                max-width: 14px;
            }

            &:hover,
            &:focus,
            &:active {
                text-decoration: none;
                outline: 0;
                box-shadow: none;
                color: #439aa1;
            }
        }
    }
}

.create-category {
    font-size: 16px;
    line-height: 25px;
    background-color: #f5fafa;
    border-radius: 10px;
    padding: 1rem;
    color: #449aa3;
    border: 1px solid #449aa3;
    margin: 1rem 0;

    &:focus,
    &:hover,
    &:active {
        color: #449aa3;
        box-shadow: none;
    }
}

.category-card {
    background-color: #fff;
    box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
    border-radius: 10px;
    padding: 1rem 2rem;

    .category-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;

        .name {
            font-size: 15px;
            font-weight: 500;
            line-height: 24px;
            color: #43425d;
        }

        .action {
            .category-action {
                font-size: 11px;
                font-weight: 500;
                border-radius: 30px;
                border: 1px solid #449aa3;
                color: #449aa3;

                img {
                    max-width: 12px;
                    margin-right: 4px;
                }

                &:hover,
                &:focus,
                &:active {
                    text-decoration: none;
                    outline: 0;
                    box-shadow: none;
                }
            }

            .category-action.delete {
                color: #ff6969;
                border: 1px solid #ff6969;
            }

            .category-action+.category-action {
                margin-left: 10px;
            }
        }
    }

    .items-wrapper {
        .category-item {
            padding: 1rem 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;

            .item-detail {
                display: flex;

                .category-thumb {
                    margin-right: 1rem;
                    border-radius: 6px;
                    overflow: hidden;
                    max-width: 80px;
                    max-height: 80px;
                }

                .item-info {

                    .name,
                    .price {
                        font-size: 14px;
                        line-height: 20px;
                        font-weight: 600;
                        color: #4d4f5c;
                    }
                }
            }

            .action {
                min-width: 150px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .checkbox-brand {
                    margin-bottom: -2px;
                    align-self: flex-end;
                }

                .btn {
                    padding: 0;

                    img {
                        max-width: 28px;
                    }

                    &:hover,
                    &:focus,
                    &:active {
                        outline: 0;
                        box-shadow: none;
                    }

                    &:last-child {
                        img {
                            max-width: 22px;
                        }
                    }
                }
            }
        }

        .category-item+.category-item {
            border-top: 1px solid #e4e4e4;
        }
    }

    &:last-child {
        margin-bottom: 3rem;
    }
}

.category-card+.category-card {
    margin-top: 1.5rem;
}

// modal styles
#profileModal {
    .modal-content {
        padding: 0;
        overflow: hidden;

        .modal-body {
            padding: 0;

            .close-modal {
                top: 25px;
                right: 25px;
                z-index: 5;
            }

            .image-container {
                height: 230px;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                img.cover-photo {
                    display: block;
                    width: 100%;
                }

                .overlay {
                    position: absolute;
                    background-color: rgba(0, 0, 0, 0.2);
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .file-input {
                        color: #fff;
                        font-size: 14px;
                        border: 1px solid #fff;
                        margin: 0;
                        padding: 5px 20px;
                        border-radius: 30px;
                        cursor: pointer;

                        img {
                            max-width: 12px;
                            margin-right: 5px;
                        }
                    }

                    input[type="file"] {
                        display: none;
                    }
                }
            }

            .info-container {
                text-align: center;
                padding: 0 5rem;

                .profile-photo {
                    position: relative;
                    top: -40px;
                    display: inline-block;
                    overflow: hidden;
                    border-radius: 40px;
                    width: 80px;
                    height: 80px;

                    img.profile-pic {
                        width: auto;
                        max-height: 100%;
                        display: block;
                        position: absolute;
                        transform: translate(-50%, -50%);
                        left: 50%;
                        top: 50%;
                    }

                    .overlay {
                        position: absolute;
                        background-color: rgba(0, 0, 0, 0.2);
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 100%;

                        .file-input {
                            margin: 0;
                            padding: 20px;
                            border-radius: 30px;
                            cursor: pointer;

                            img {
                                max-width: 12px;
                            }
                        }

                        input[type="file"] {
                            display: none;
                        }
                    }
                }

                #profile-form {
                    text-align: left;
                    position: relative;
                    top: -25px;

                    label {
                        font-size: 12px;
                        line-height: 18px;
                        color: #454f63;
                        margin-bottom: 5px;
                        display: block;
                    }

                    input,
                    select {
                        font-size: 12px;
                        line-height: 18px;
                        border: 1px solid #439aa1;
                        border-radius: 40px;
                        padding: 0.6rem 1rem;
                        margin-bottom: 0.8rem;
                        height: auto;
                    }

                    select {
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        appearance: none;
                        background-image: url("~@/assets/images/icons/icon-arrow-down-teal.svg");
                        background-repeat: no-repeat;
                        background-size: 12px;
                        background-position: calc(100% - 20px) center;
                    }

                    .form-action {
                        margin-top: 2rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .btn {
                            width: 48%;
                            text-transform: none;

                            &:first-child {
                                background-color: #e2ebf0;

                                &:before,
                                &:after {
                                    background-color: #e2ebf0;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

#addCategoryModal,
#editCategoryModal {
    .modal-body {
        padding: 5rem 4rem 2rem;

        input {
            font-size: 12px;
            line-height: 18px;
            border: 1px solid #439aa1;
            border-radius: 40px;
            padding: 0.6rem 1rem;
            margin-bottom: 1.5rem;
            height: auto;
        }

        .form-action {
            margin-top: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
                width: 48%;
                text-transform: none;

                &:first-child {
                    background-color: #e2ebf0;

                    &:before,
                    &:after {
                        background-color: #e2ebf0;
                    }
                }
            }
        }
    }
}

#deleteCategoryModal,
#deleteItemModal {
    .modal-body {
        padding: 3rem 2rem;

        h5 {
            margin-bottom: 1.5rem;
        }

        .modal-action {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .btn {
                width: 48%;

                &:last-child {
                    border-color: #fff;
                    background-color: #ff6969;

                    span {
                        color: #fff;
                    }

                    &:before,
                    &:after {
                        background-color: #ff6969;
                    }
                }
            }
        }
    }
}

#addItemModal,
#editItemModal {
    .modal-body {
        padding: 2rem 6rem;
    }

    .item-thumb-upload {
        width: 70px;
        height: 70px;
        border-radius: 6px;
        border: 1px solid #449aa3;
        position: relative;
        margin-bottom: 1.5rem;

        .overlay {
            position: absolute;
            //background-color: rgba(0,0,0,0.2);
            background-color: #f5fafa;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;

            .file-input {
                margin: 0;
                padding: 20px;
                border-radius: 30px;
                cursor: pointer;

                img {
                    max-width: 24px;
                }
            }

            input[type="file"] {
                display: none;
            }
        }
    }

    .item-thumb-upload.has-image {
        border: 0;

        .item-thumb {
            width: 70px;
            height: 70px;
        }

        .overlay {
            background-color: rgba(0, 0, 0, 0.2);

            .file-input {
                img {
                    max-width: 24px;
                }
            }

            input[type="file"] {
                display: none;
            }
        }
    }

    input.form-control {
        font-size: 12px;
        line-height: 18px;
        border: 1px solid #439aa1;
        border-radius: 40px;
        padding: 0.6rem 1rem;
        margin-bottom: 1.5rem;
        height: auto;
    }

    .btn.btn-brand-minimal {
        min-width: 170px;
        font-size: 12px;
        color: #439aa1;
        border: 1px solid #439aa1;
        background-color: #ecf5f6;
        border-radius: 40px;
        margin-bottom: 1rem;

        img {
            max-width: 10px;
            margin-right: 5px;
        }

        &:hover,
        &:focus,
        &:active {
            text-decoration: none;
            outline: 0;
            box-shadow: none;
            color: #439aa1;
        }
    }

    .calory-price {
        display: flex;
        align-items: center;
        justify-content: space-between;

        input.form-control {
            width: 48%;
        }
    }

    .add-on-items {
        .add-on-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;

            input.form-control {
                margin-bottom: 0;
                width: 43%;
            }

            .btn {

                &:hover,
                &:focus,
                &:active {
                    outline: 0;
                    box-shadow: none;
                }
            }
        }
    }

    .attributes-items {
        .attribute-item {
            margin-bottom: 1rem;

            .attribute {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 0.5rem;

                input.form-control {
                    margin-bottom: 0;
                    width: 65%;
                }

                a.btn-brand-minimal {
                    padding: 0.6rem 1rem;
                    margin-bottom: 0;
                    min-width: auto;
                }

                .remove-attribute {

                    &:hover,
                    &:focus,
                    &:active {
                        outline: 0;
                        box-shadow: none;
                    }
                }
            }

            .matrix {
                display: inline-flex;
                width: 49.5%;
                align-items: center;

                input.form-control {
                    margin-bottom: 0;
                }

                a.remove-matrix {
                    margin: 0;

                    &:hover,
                    &:focus,
                    &:active {
                        outline: 0;
                        box-shadow: none;
                    }
                }
            }
        }
    }

    .modal-action {
        width: 75%;
        margin: 2rem auto 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btn {
            width: 48%;
            text-transform: none;
            padding: 5px 35px;

            &:first-child {
                background-color: #e2ebf0;

                &:before,
                &:after {
                    background-color: #e2ebf0;
                }
            }
        }
    }
}

.demo-elements {
    display: none;
}

#deleteCategoryModal {
    .modal-dialog {
        margin: 18rem auto;
    }
}

html[dir="rtl"] {
    .profile-card {
        .profile-info-container {
            .profile-info {
                .avatar {
                    margin-right: 0;
                    margin-left: 20px;

                    img {
                        max-width: 64px;
                        max-height: 64px;
                    }
                }

                .details {
                    margin-left: 20px;
                    text-align: right;

                    .rating {
                        .stars {
                            margin-left: 5px;
                            margin-right: auto;
                        }
                    }
                }
            }
        }
    }

    .category-card {
        .category-header {
            .action {
                .category-action {
                    img {
                        margin-left: 4px;
                        margin-right: 0;
                    }
                }

                .category-action+.category-action {
                    margin-left: 0;
                    margin-right: 10px;
                }
            }
        }

        .items-wrapper {
            .category-item {
                .item-detail {
                    .item-info {

                        .name,
                        .price {
                            text-align: right;
                        }
                    }

                    .category-thumb {
                        margin-right: 0;
                        margin-left: 1rem;
                    }
                }
            }
        }
    }

    #profileModal {
        .modal-content {
            .modal-body {
                .close-modal {
                    right: auto;
                    left: 25px;
                }

                .info-container {
                    #profile-form {
                        label {
                            text-align: right;
                        }

                        select {
                            background-position: 20px center;
                        }
                    }
                }
            }
        }
    }
}
</style>

<script>
import axios from "axios";
import $ from "jquery";
import Bootstrap from "bootstrap";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import config from "../config";
import locales from "../locales";

export default {
    name: "Profile",
    component: {
        Bootstrap
    },
    components: {
        Header,
        Navbar
    },
    data() {
        return {
            user: {},
            userData: {},
            lang: window.localStorage.getItem("kol_user_lang"),
            strings: locales,
            userDataToUpdate: {
                name: "",
                type: "",
                profilePhoto: null,
                profilePhotoFile: null,
                coverPhoto: null,
                coverPhotoFile: null,
                fullAddress: ""
            },
            newFoodCategoryName: "",
            restaurantCategories: [],
            foodCategories: [],
            foodCategoryToUpdate: "",
            foodCategoryToDelete: "",
            foodItems: [],
            newFoodItem: {
                category: "",
                name: "",
                picture: "",
                pictureFile: "",
                price: "",
                calorie: "",
                addons_display: [],
                attributes_display: []
            },
            addonModel: {
                name: "",
                price: ""
            },
            attributeModel: {
                name: "",
                attribute_matrix: []
            },
            matrixModel: {
                name: "",
                attribute: ""
            },
            foodItemToUpdate: "",
            foodItemToDelete: "",
            foodItemToBeSavedToCategory: "",
            foodAddonDelete: "",
            foodAttributeDelete: "",
            foodMatrixDelete: "",
        };
    },
    methods: {
        checkFormData(data) {
            var object = {};
            data.forEach((value, key) => {
                object[key] = value;
            });
            var json = JSON.stringify(object);
            console.log(object);
        },

        checkUserData() {
            if (this.$store.state.user === null) {
                if (JSON.parse(window.localStorage.getItem("kol_user")) === null) {
                    this.$router.push({
                        path: "/signin"
                    });
                } else {
                    this.$store.commit(
                        "updateUser",
                        JSON.parse(window.localStorage.getItem("kol_user"))
                    );
                    this.user = this.$store.state.user;
                }
            } else {
                this.user = this.$store.state.user;
            }
        },
        fetchUserData() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "get",
                    url: `${config.base_url}account/restaurant/${that.user.id}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    console.log("user data", response);
                    if (response.status === 200) {
                        that.userData = response.data;
                        that.user = response.data.user;
                        that.userDataToUpdate.name = response.data.user.name;
                        that.userDataToUpdate.type = response.data.restaurant_type;
                        that.userDataToUpdate.fullAddress = response.data.full_address;
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        this.$router.push({
                            path: "/signin"
                        });
                    }
                });
        },
        previewCoverPhoto(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.userDataToUpdate.coverPhoto = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
                this.userDataToUpdate.coverPhotoFile = event.target.files[0];
            }
        },
        previewProfilePhoto(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.userDataToUpdate.profilePhoto = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
                this.userDataToUpdate.profilePhotoFile = event.target.files[0];
            }
        },
        previewFoodPhoto(event) {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.onload = e => {
                    this.newFoodItem.picture = e.target.result;
                };
                reader.readAsDataURL(event.target.files[0]);
                this.newFoodItem.pictureFile = event.target.files[0];
            }
        },
        loadRestaurantTypes() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "get",
                    url: `${config.base_url}account/restaurant/category/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    that.restaurantCategories = response.data.results;
                })
                .catch(error => {
                    console.log(error.response);
                });
        },
        updateUserData(event) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            const userData = new FormData();
            userData.append("user.name", that.userDataToUpdate.name);
            if (that.userDataToUpdate.profilePhoto !== null) {
                userData.append(
                    "user.profile_picture",
                    that.userDataToUpdate.profilePhotoFile
                );
            }
            userData.append("restaurant_type", that.userDataToUpdate.type);
            userData.append("full_address", that.userDataToUpdate.fullAddress);
            if (that.userDataToUpdate.coverPhoto !== null) {
                userData.append("cover_picture", that.userDataToUpdate.coverPhotoFile);
            }
            $("#profileModal").modal("hide");
            axios({
                    method: "patch",
                    url: `${config.base_url}account/restaurant/${that.user.id}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: userData
                })
                .then(response => {
                    console.log("user profile updated data", response);
                    if (response.status === 200) {
                        Toast.fire({
                            icon: "success",
                            title: "Profile updated"
                        });
                        // that.userData = response.data;
                        // that.user = response.data.user;
                        that.fetchUserData();
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        this.$router.push({
                            path: "/signin"
                        });
                    }
                })
                .finally(() => {
                    event.target.disabled = false;
                });
        },

        // food categories;
        getFoodCategories() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "get",
                    url: `${config.base_url}food/category/?user=${that.user.id}`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    console.log("get all category", response.data.results);
                    that.foodCategories = response.data.results.sort((a, b) => {
                        return b.id - a.id;
                    });
                })
                .catch(error => {
                    console.log(error.response);
                });
        },
        addFoodCategory(event) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            axios({
                    method: "post",
                    url: `${config.base_url}food/category/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: {
                        name: that.newFoodCategoryName
                    }
                })
                .then(response => {
                    console.log(response);
                    if (response.status === 201) {
                        that.getFoodCategories();
                        $("#addCategoryModal").modal("hide");
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
                .finally(() => {
                    event.target.disabled = false;
                    that.newFoodCategoryName = "";
                });
        },
        setFoodCategoryIdToEdit(id, name) {
            this.foodCategoryToUpdate = id;
            this.newFoodCategoryName = name;
        },
        clearFoodCategoryIdToEdit() {
            this.foodCategoryToUpdate = "";
            this.newFoodCategoryName = "";
        },
        editFoodCategory() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "patch",
                    url: `${config.base_url}food/category/${that.foodCategoryToUpdate}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: {
                        name: that.newFoodCategoryName
                    }
                })
                .then(response => {
                    console.log("edit category food", response);
                    if (response.status === 200) {
                        that.getFoodCategories();
                        $("#editCategoryModal").modal("hide");
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
                .finally(() => {
                    that.newFoodCategoryName = "";
                    that.foodCategoryToUpdate = "";
                });
        },
        setFoodCategoryIdToDelete(id) {
            this.foodCategoryToDelete = id;
        },
        clearFoodCategoryIdToDelete() {
            this.foodCategoryToDelete = "";
        },
        deleteFoodCategory() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "delete",
                    url: `${config.base_url}food/category/${that.foodCategoryToDelete}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    console.log(response);
                    if (response.status === 204) {
                        that.getFoodCategories();
                        $("#deleteCategoryModal").modal("hide");
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
        },

        // food items;
        getFoodItems() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "get",
                    url: `${config.base_url}food/item/?limit=100&&user=${that.user.id}`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    console.log("all food items", response);
                    if (response.status === 200) {
                        console.log('get all food', response);
                        that.foodItems = response.data.results.sort((a, b) => {
                            return b.id - a.id;
                        });
                    }
                })
                .catch(error => {
                    console.log(error.response);
                });
        },
        addFoodAddOn() {
            const model = JSON.stringify(this.addonModel);
            console.log('add on modal', model)
            this.newFoodItem.addons_display.push(JSON.parse(model));
            // console.log("food addon", model);
            // console.log("modal add on", this.newFoodItem);
        },
        removeAddOn(index, addonId = null) {
            console.log(addonId)
            this.newFoodItem.addons_display.splice(index, 1);
            // this.foodAddonDelete = addonId;
            this.deleteFoodAddOn(addonId)

        },
        addAttribute() {
            const model = JSON.stringify(this.attributeModel);
            this.newFoodItem.attributes_display.push(JSON.parse(model));
            // console.log("add attributes modal", model);
        },
        removeAttribute(index, attributeId = null) {
            this.newFoodItem.attributes_display.splice(index, 1);
            this.deleteFoodAttribute(attributeId)
        },
        addMatrix(index) {
            const model = JSON.stringify(this.matrixModel);
            this.newFoodItem.attributes_display[index].attribute_matrix.push(
                JSON.parse(model)
            );
        },
        removeMatrix(target, index, matrixId = null) {
            this.newFoodItem.attributes_display[target].attribute_matrix.splice(index, 1);
            this.deleteFoodAttributeMatrix(matrixId)
        },

        addItemModal(){
            this.clearNewFoodItem();
            $('#addItemModal').modal('show');
        },

        // Add food
        addFoodItem(event) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            const newFoodData = new FormData();
            newFoodData.append("name", that.newFoodItem.name);
            newFoodData.append("category", that.foodItemToBeSavedToCategory);
            newFoodData.append("price", that.newFoodItem.price);
            newFoodData.append("calorie", that.newFoodItem.calorie);
            newFoodData.append("is_active", true);
            newFoodData.append("addons", JSON.stringify(that.newFoodItem.addons_display));
            newFoodData.append(
                "attributes",
                JSON.stringify(that.newFoodItem.attributes_display)
            );
            if (that.newFoodItem.picture !== "") {
                newFoodData.append("picture", that.newFoodItem.pictureFile);
            }

            // this.checkFormData(newFoodData);
            // return false;
            $("#addItemModal").modal("hide");
            axios({
                    method: "post",
                    url: `${config.base_url}food/item/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: newFoodData
                })
                .then(response => {
                    if (response.status === 201) {
                        console.log("new food added", response.data.id);
                        Toast.fire({
                            icon: "success",
                            title: "New item added"
                        });
                        this.addNewFoodAddOn(response.data.id);
                        this.addNewFoodAttributes(response.data.id);
                        that.getFoodItems();
                        // that.foodItems = response.data.results;
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
                .finally(() => {
                    event.target.disabled = true;
                });
        },
        addNewFoodAddOn(foodId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            this.newFoodItem.addons_display.map(addon => {
                const newAddOnData = new FormData();
                newAddOnData.append("food", foodId);
                newAddOnData.append("name", addon.name);
                newAddOnData.append("price", addon.price);
                axios({
                        method: "post",
                        url: `${config.base_url}food/add-on/`,
                        headers: {
                            Authorization: `JWT ${Token}`
                        },
                        data: newAddOnData
                    })
                    .then(response => {
                        // console.log("add new add on", response);
                        // if (response.status === 201) {
                        //   console.log("new food added", response.data.id);
                        // }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            })
        },
        addNewFoodAttributes(foodId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            this.newFoodItem.attributes_display.map(attribute => {
                const newAttributeData = new FormData();
                newAttributeData.append("food", foodId);
                newAttributeData.append("name", attribute.name);
                axios({
                        method: "post",
                        url: `${config.base_url}food/attribute/`,
                        headers: {
                            Authorization: `JWT ${Token}`
                        },
                        data: newAttributeData
                    })
                    .then(response => {
                        // console.log("add new attributes", response);

                        if (response.status === 201) {
                            this.addNewFoodAttributeMatrix(response.data.id, attribute.attribute_matrix)
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            })
        },
        addNewFoodAttributeMatrix(attributeId, attributeMatrix) {

            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            attributeMatrix.map(matrix => {
                const newAttributeData = new FormData();
                newAttributeData.append("name", matrix.name);
                newAttributeData.append("attribute", attributeId);
                axios({
                        method: "post",
                        url: `${config.base_url}food/attribute-matrix/`,
                        headers: {
                            Authorization: `JWT ${Token}`
                        },
                        data: newAttributeData
                    })
                    .then(response => {
                        // console.log("add new attributes matrix", response);
                        // if (response.status === 201) {
                        //   console.log("new food added", response.data.id);
                        // }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            })
        },
        clearNewFoodItem() {
            this.newFoodItem = {
                category: "",
                name: "",
                picture: "",
                pictureFile: "",
                price: "",
                calorie: "",
                addons_display: [],
                attributes_display: []
            };
        },
        //
        setFoodItemToEdit(id) {
            
            const foodItem = JSON.stringify(
                this.foodItems.filter(item => item.id === id)[0]
            );
            
              const fdItem = JSON.parse(foodItem);
            delete fdItem.addons;
            delete fdItem.attributes;

            this.newFoodItem = fdItem;

            $('#editItemModal').modal('show');

            console.log('set food item to edit', this.newFoodItem)
            // console.log(fdItem);

            // this.newFoodItem = JSON.parse(foodItem);
            this.foodItemToUpdate = id;
        },
        editFoodItem() {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            const editFoodData = new FormData();
            editFoodData.append("name", that.newFoodItem.name);
            editFoodData.append("category", that.newFoodItem.category);
            editFoodData.append("price", that.newFoodItem.price);
            editFoodData.append("calorie", that.newFoodItem.calorie);
            editFoodData.append("is_active", true);
            editFoodData.append("addons", JSON.stringify(that.newFoodItem.addons_display));
            editFoodData.append(
                "attributes",
                JSON.stringify(that.newFoodItem.attributes_display)
            );
            if (that.newFoodItem.picture == "") {
                editFoodData.append("picture", that.newFoodItem.pictureFile);
            }

            axios({
                    method: "patch",
                    url: `${config.base_url}food/item/${that.foodItemToUpdate}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    },
                    data: editFoodData
                })
                .then(response => {
                    if (response.status === 200) {
                        Toast.fire({
                            icon: "success",
                            title: "Item updated"
                        });
                        this.editFoodAddOn(that.foodItemToUpdate);
                        this.editFoodAttributes(that.foodItemToUpdate);
                        that.getFoodCategories();
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
                .finally(() => {
                    $("#editItemModal").modal("hide");
                    event.target.disabled = true;
                    that.getFoodItems();
                    that.clearNewFoodItem();
                });
        },

        editFoodAddOn(foodId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            this.newFoodItem.addons_display.map(addon => {
                const editAddOnData = new FormData();
                editAddOnData.append("food", foodId);
                editAddOnData.append("name", addon.name);
                editAddOnData.append("price", addon.price);
                axios({
                        method: "patch",
                        url: `${config.base_url}food/add-on/${addon.id}`,
                        headers: {
                            Authorization: `JWT ${Token}`
                        },
                        data: editAddOnData
                    })
                    .then(response => {
                        console.log("Food addon updated", response);
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            })
        },
        editFoodAttributes(foodId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            this.newFoodItem.attributes_display.map(attribute => {
                const editAttributeData = new FormData();
                editAttributeData.append("food", foodId);
                editAttributeData.append("name", attribute.name);
                axios({
                        method: "patch",
                        url: `${config.base_url}food/attribute/${attribute.id}`,
                        headers: {
                            Authorization: `JWT ${Token}`
                        },
                        data: editAttributeData
                    })
                    .then(response => {
                        console.log("Attribute updated", response);
                        if (response.status === 200) {
                            this.editFoodAttributeMatrix(attribute.id, attribute.attribute_matrix)
                        }
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            })
        },
        editFoodAttributeMatrix(attributeId, attributeMatrix) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            event.target.disabled = true;
            attributeMatrix.map(matrix => {
                const editAttributeMatrixData = new FormData();
                editAttributeMatrixData.append("name", matrix.name);
                editAttributeMatrixData.append("attribute", attributeId);
                axios({
                        method: "patch",
                        url: `${config.base_url}food/attribute-matrix/${matrix.id}`,
                        headers: {
                            Authorization: `JWT ${Token}`
                        },
                        data: editAttributeMatrixData
                    })
                    .then(response => {
                        console.log("Attribute matrix updated", response);
                    })
                    .catch(error => {
                        console.log(error.response);
                    });
            })
        },
        isActiveItem(id) {

            console.log('food item id', id)
        },

        setFoodItemToDelete(id) {
            this.foodItemToDelete = id;
        },
        deleteFoodItem() {
            
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "delete",
                    url: `${config.base_url}food/item/${that.foodItemToDelete}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    console.log(response);
                    if (response.status === 204) {
                        Toast.fire({
                            icon: "success",
                            title: "Item deleted"
                        });
                    }
                })
                .catch(error => {
                    console.log(error.response);
                })
                .finally(() => {
                    $("#deleteItemModal").modal("hide");
                    that.foodItemToDelete = "";
                    that.getFoodItems();
                });
        },
        deleteFoodAddOn(addonId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "delete",
                    url: `${config.base_url}food/add-on/${addonId}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    this.getFoodItems();
                    console.log('food addon deleted get', response);
                    // if (response.status === 204) {
                    //     that.getFoodItems();
                    // }
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
        deleteFoodAttribute(attributeId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "delete",
                    url: `${config.base_url}food/attribute/${attributeId}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    this.getFoodItems();
                    console.log('food attributeId deleted get', response);
                    // if (response.status === 204) {
                    //     that.getFoodItems();
                    // }
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
        deleteFoodAttributeMatrix(matrixId) {
            const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
            const that = this;
            axios({
                    method: "delete",
                    url: `${config.base_url}food/attribute-matrix/${matrixId}/`,
                    headers: {
                        Authorization: `JWT ${Token}`
                    }
                })
                .then(response => {
                    console.log('food matrixId deleted get', response);
                    // if (response.status === 204) {
                    //     that.getFoodItems();
                    // }
                })
                .catch(error => {
                    console.log(error.response);
                })
        },
    },

    mounted() {
        this.checkUserData();
        this.fetchUserData();
        this.loadRestaurantTypes();
        this.getFoodCategories();
        this.getFoodItems();
    },
    updated() {
        
    }
};
</script>
