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
                <div class="tables-wrapper">
                  <div
                    class="r-table"
                    v-bind:class="{ disabled: !table.public }"
                    v-for="(table, i) in tables"
                    v-bind:key="i"
                  >
                    <div class="table-menu-icon">
                      <img
                        src="@/assets/images/icons/icon-burger-dots.svg"
                        v-on:click="toggleTableMenu($event)"
                      />
                    </div>
                    <div class="table-menu">
                      <ul>
                        <li>
                          <a
                            href
                            data-toggle="modal"
                            data-target="#tableEditModal"
                            v-on:click="setTableIdToEdit(table.id, table.name, table.qr_code)"
                          >{{strings.edit[lang]}}</a>
                        </li>
                        <li v-if="!table.public">
                          <a
                            href="#"
                            v-on:click="toggleTableStatus($event, table.id, true)"
                          >{{strings.enable[lang]}}</a>
                        </li>
                        <li v-if="table.public">
                          <a
                            href
                            v-on:click="toggleTableStatus($event, table.id, false)"
                          >{{strings.disable[lang]}}</a>
                        </li>
                        <li>
                          <a
                            href
                            data-toggle="modal"
                            data-target="#warningModal"
                            v-on:click="setTableIdToDelete(table.id)"
                          >{{strings.delete[lang]}}</a>
                        </li>
                      </ul>
                    </div>
                    <div class="table-number">
                      <img src="@/assets/images/icons/icon-table.svg" />
                      <span>{{table.name}}</span>
                    </div>
                  </div>
                  <div
                    class="r-table add-table"
                    data-toggle="modal"
                    data-target="#tableModal"
                    v-on:click="newTableName = ''"
                  >
                    <img src="@/assets/images/icons/icon-plus.svg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--    Modals -->
      <div
        class="modal container-fluid fade"
        id="tableModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="tableModalLabel"
        aria-hidden="true"
      >
        <div class="row">
          <div class="col-3 col-md-2"></div>
          <div class="modal-dialog col-9 col-md-10" role="document">
            <div class="row justify-content-center custom-row">
              <div class="modal-content col-12 col-md-10 col-lg-6">
                <div class="modal-body">
                  <div class="table-modal">
                    <input
                      type="text"
                      class="form-control brand-input"
                      name="table-name"
                      :placeholder="strings.table_name[lang]"
                      v-model="newTableName"
                    />
                    <p class="text-center" v-if="fetchingQrCode">{{strings.wait_for_qr_code[lang]}}</p>
                    <div v-if="newTableQrCode" class="barcode">
                      <img v-bind:src="newTableQrCode" />
                    </div>
                    <a v-if="newTableQrCode" href="#" class="btn btn-block print">Print</a>
                    <div class="action">
                      <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                        <span>{{strings.cancel[lang]}}</span>
                      </a>
                      <button
                        class="btn btn-brand-styled-bordered"
                        v-on:click="addTable($event)"
                        v-bind:disabled="newTableName.length <= 1"
                      >
                        <span>{{strings.save[lang]}}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal container-fluid fade"
        id="tableEditModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="tableEditModalLabel"
        aria-hidden="true"
      >
        <div class="row">
          <div class="col-3 col-md-2"></div>
          <div class="modal-dialog col-9 col-md-10" role="document">
            <div class="row justify-content-center custom-row">
              <div class="modal-content col-12 col-md-10 col-lg-6">
                <div class="modal-body">
                  <div class="table-modal">
                    <input
                      type="text"
                      class="form-control brand-input"
                      name="table-name"
                      :placeholder="strings.table_name[lang]"
                      v-model="newTableName"
                    />
                    <div class="barcode">
                      <img v-if="tableQrCode" v-bind:src="tableQrCode" />
                    </div>
                    <a
                      v-if="tableQrCode"
                      href="#"
                      class="btn btn-block print"
                      v-on:click.prevent="printQRCode"
                    >{{strings.print[lang]}}</a>
                    <div class="action">
                      <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                        <span>{{strings.cancel[lang]}}</span>
                      </a>
                      <button
                        class="btn btn-brand-styled-bordered"
                        v-on:click="editTable($event)"
                        v-bind:disabled="newTableName.length <= 1"
                      >
                        <span>{{strings.save[lang]}}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal container-fluid fade"
        id="warningModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="warningModalLabel"
        aria-hidden="true"
      >
        <div class="row">
          <div class="col-3 col-md-2"></div>
          <div class="modal-dialog col-9 col-md-10" role="document">
            <div class="row justify-content-center custom-row">
              <div class="modal-content col-12 col-md-10 col-lg-4">
                <div class="modal-body">
                  <h5>{{strings.r_u_sure[lang]}}</h5>
                  <div class="modal-action">
                    <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                      <span>{{strings.cancel[lang]}}</span>
                    </a>
                    <button v-on:click="deleteTable($event)" class="btn btn-brand-styled-bordered">
                      <span>{{strings.delete[lang]}}</span>
                    </button>
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
.tables-wrapper {
  display: grid;
  grid-template-columns: 170px 170px 170px 170px;
  grid-template-rows: 170px 170px 170px 170px;
  grid-gap: 30px;
  padding-bottom: 15px;
  .r-table {
    border-radius: 55px;
    background-color: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    border: 7px solid #449aa3;
    position: relative;
    width: 170px;
    height: 170px;
    &:before,
    &:after {
      content: "";
      display: inline-block;
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 50%;
      background-color: #fff;
    }

    &:before {
      height: calc(100% + 14px);
      width: 45%;
    }

    &:after {
      height: 45%;
      width: calc(100% + 14px);
    }

    .table-number {
      position: absolute;
      transform: translate(-50%, -50%);
      left: 50%;
      top: 60%;
      z-index: 5;
      text-align: center;
      img {
      }

      span {
        display: inline-block;
        margin-top: 8px;
        font-size: 15px;
        line-height: 23px;
        color: #449aa3;
        text-transform: uppercase;
      }
    }

    .table-menu-icon {
      position: absolute;
      display: inline-block;
      right: 15px;
      top: 15px;
      z-index: 6;
      cursor: pointer;
    }

    .table-menu {
      background-color: #fff;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
      position: absolute;
      right: -7px;
      top: -7px;
      z-index: 10;
      display: none;

      ul {
        margin-bottom: 0;
        list-style: none;

        li {
          font-size: 15px;
          line-height: 23px;

          a {
            display: block;
            padding: 0.5rem 1rem;
            color: #000;

            &:hover,
            &:focus,
            &:active {
              color: #000;
              text-decoration: none;
              background-color: #efefef;
            }
          }
        }
      }
    }
  }

  .r-table.disabled {
    opacity: 0.5;
  }

  .r-table.add-table {
    background-color: #ecf5f6;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:before,
    &:after {
      background-color: #ecf5f6;
    }

    img {
      position: relative;
      z-index: 10;
    }
  }
}

html[dir="rtl"] {
  .tables-wrapper {
    .r-table {
      .table-menu-icon {
        left: 15px;
        right: auto;
      }

      .table-menu {
        left: -7px;
        right: auto;
        ul {
          li {
            a {
              text-align: right;
            }
          }
        }
      }
    }
  }
}

.table-modal {
  padding: 0 2rem;
  .brand-input {
    border-radius: 40px;
    padding: 0.8rem 1.5rem;
    border: 1px solid #439aa1;
    color: #454f63;
    font-size: 16px;
    line-height: 20px;
    &:focus {
      box-shadow: none;
      outline: 0;
    }
  }

  .barcode {
    img {
      max-width: 70%;
      margin: 0 auto;
      display: block;
    }
  }

  .print {
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    color: #439aa1;
    background-color: #ecf5f6;
    border-radius: 40px;
    margin-top: 2rem;
    padding: 0.8rem 0.75rem;
    &:focus {
      outline: 0;
      box-shadow: none;
    }
  }

  .action {
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

#warningModal {
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

#warningModal {
  .modal-dialog {
    margin: 18rem auto;
  }
}

@media print {
  header,
  .brand-navbar,
  .tables-wrapper,
  .form-control,
  .print,
  .action {
    display: none !important;
  }
  .barcode {
    margin: 0 auto;
    text-align: center;
    img {
      width: 100%;
      border: 1px solid #000000;
    }
  }
}

@media screen and (max-width: 991px) {
  .tables-wrapper {
    grid-template-columns: 140px 140px 140px 140px;
    grid-template-rows: 140px 140px 140px 140px;
    .r-table {
      border-radius: 40px;
      width: 140px;
      height: 140px;
      .table-menu-icon {
        top: 10px;
        right: 10px;
      }
    }
  }
}
</style>

<script>
import axios from "axios";
import $ from "jquery";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import config from "../config";
import locales from "../locales";

export default {
  name: "Tables",
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      user: {},
      tables: [],
      newTableName: "",
      newTableQrCode: null,
      tableToDelete: "",
      tableToEdit: "",
      tableQrCode: null,
      fetchingQrCode: false,
      lang: window.localStorage.getItem("kol_user_lang"),
      strings: locales
    };
  },
  methods: {
    toggleTableMenu(event) {
      event.stopPropagation();
      this.hideTableMenu();
      const menuItem = event.target
        .closest(".r-table")
        .getElementsByClassName("table-menu")[0];
      menuItem.style.display = "block";
    },
    hideTableMenu() {
      const menus = window.document.getElementsByClassName("table-menu");
      // menus.forEach((menu) => { menu.style.display = 'none'; });
      for (let i = 0; i < menus.length; i += 1) {
        menus[i].style.display = "none";
      }
    },
    checkUserData() {
      if (this.$store.state.user === null) {
        try {
          this.$store.commit(
            "updateUser",
            JSON.parse(window.localStorage.getItem("kol_user"))
          );
          this.user = this.$store.state.user;
        } catch {
          this.$router.push({ path: "/signin" });
        }
      } else {
        this.user = this.$store.state.user;
      }
    },
    getTables() {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      const limit = 50;
      const offset = 0;
      axios({
        method: "get",
        url: `${config.base_url}restaurant-table/?user=${that.user.id}&limit=${limit}&offset=${offset}`,
        headers: {
          Authorization: `JWT ${Token}`
        }
      })
        .then(response => {
          console.log("table", response);
          if (response.status === 200) {
            that.tables = response.data.results.sort((a, b) => {
              return b.id - a.id;
            });
          }
        })
        .catch(error => {
          // console.log(error.response);
          if (error.response.status === 401) {
            this.$router.push({ path: "/signin" });
          }
        });
    },
    addTable(event) {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      event.target.disabled = true;
      axios({
        method: "post",
        url: `${config.base_url}restaurant-table/`,
        headers: {
          Authorization: `JWT ${Token}`
        },
        data: {
          name: that.newTableName
        }
      })
        .then(response => {
          if (response.status === 201) {
            console.log(response.data);
            this.fetchingQrCode = true;
            setTimeout(() => {
              axios({
                method: "get",
                url: `${config.base_url}restaurant-table/${response.data.id}/`,
                headers: {
                  Authorization: `JWT ${Token}`
                }
              })
                .then(r => {
                  if (r.status === 200) {
                    Toast.fire({
                      icon: "success",
                      title: "New table added"
                    });
                    that.fetchingQrCode = false;
                    that.newTableQrCode = r.data.qr_code;
                  }
                })
                .catch(er => {
                  console.log(er);
                });
            }, 2000);
            that.newTableQrCode = response.data.id;
            that.getTables();
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          event.target.disabled = false;
          that.newTableName = "";
        });
    },
    setTableIdToEdit(id, name, qrCode) {
      this.tableToEdit = id;
      this.newTableName = name;
      this.tableQrCode = qrCode;
    },
    editTable(event) {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      event.target.disabled = true;
      axios({
        method: "put",
        url: `${config.base_url}restaurant-table/${that.tableToEdit}/`,
        headers: {
          Authorization: `JWT ${Token}`
        },
        data: {
          name: that.newTableName
        }
      })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            Toast.fire({
              icon: "success",
              title: "Table updated"
            });
            $("#tableEditModal").modal("hide");
            that.getTables();
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          event.target.disabled = false;
          that.newTableName = "";
        });
    },
    setTableIdToDelete(id) {
      this.tableToDelete = id;
    },
    deleteTable(event) {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      event.target.disabled = true;
      axios({
        method: "delete",
        url: `${config.base_url}restaurant-table/${that.tableToDelete}/`,
        headers: {
          Authorization: `JWT ${Token}`
        }
      })
        .then(response => {
          console.log(response);
          if (response.status === 204) {
            Toast.fire({
              icon: "success",
              title: "Table deleted"
            });
            $("#warningModal").modal("hide");
            that.getTables();
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          event.target.disabled = false;
        });
    },
    toggleTableStatus(event, tableId, status) {
      event.preventDefault();
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      // const that = this;
      event.target.disabled = true;
      axios({
        method: "patch",
        url: `${config.base_url}restaurant-table/${tableId}/`,
        headers: {
          Authorization: `JWT ${Token}`
        },
        data: {
          public: status
        }
      })
        .then(response => {
          if (response.status === 200) {
            this.getTables();
          }
        })
        .catch(error => {
          console.log(error.response);
        })
        .finally(() => {
          event.target.disabled = false;
        });
    },
    printQRCode() {
      // console.log('ok');
      window.print();
    }
  },
  mounted() {
    this.checkUserData();
    this.getTables();
    window.addEventListener("click", this.hideTableMenu);
  },
  destroyed() {
    window.removeEventListener("click", this.hideTableMenu);
  }
};
</script>
