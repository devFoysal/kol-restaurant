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
                <ul class="nav nav-tabs" id="ticketsTab" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#processing"
                      role="tab"
                      aria-controls="processing"
                      aria-selected="true"
                    >{{strings.processing[lang]}}</a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#closed"
                      role="tab"
                      aria-controls="closed"
                      aria-selected="false"
                    >{{strings.closed[lang]}}</a>
                  </li>
                </ul>

                <div class="tab-content" id="ticketsTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="processing"
                    role="tabpanel"
                    aria-labelledby="processing-tab"
                  >
                    <a
                      href="#"
                      data-toggle="modal"
                      data-target="#ticketModal"
                      class="btn btn-block generate-ticket"
                    >{{strings.more_ticket[lang]}}</a>

                    <router-link
                      :to="{ path: `/ticket/${ticket.id}` }"
                      class="ticket-wrapper"
                      v-for="(ticket, i) in tickets.filter(item => item.status === 0)"
                      v-bind:key="i"
                    >
                      <div class="ticket-item">
                        <div class="ticket-meta-info">
                          <div class="ticket-id">{{ticket.topic}}</div>
                          <div class="generate-date">{{formatDate(ticket.created_at)}}</div>
                        </div>
                        <div class="ticket-details">{{ticket.description}}</div>
                      </div>
                    </router-link>
                  </div>

                  <div
                    class="tab-pane fade"
                    id="closed"
                    role="tabpanel"
                    aria-labelledby="complete-tab"
                  >
                    <router-link
                      class="ticket-wrapper"
                      :to="{ path: `/ticket/${ticket.id}` }"
                      v-for="(ticket, i) in tickets.filter(item => item.status === 1)"
                      v-bind:key="i"
                    >
                      <div class="ticket-item">
                        <div class="ticket-meta-info">
                          <div class="ticket-id">{{ticket.topic}}</div>
                          <div class="generate-date">{{formatDate(ticket.created_at)}}</div>
                        </div>
                        <div class="ticket-details">{{ticket.description}}</div>
                      </div>
                    </router-link>
                    <div
                      class="no-tickets"
                      v-if="tickets.filter(item => item.status === 1).length === 0"
                    >
                      <!--                      <h3>No closed tickets here</h3>-->
                    </div>
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
        id="ticketModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="ticketModalLabel"
        aria-hidden="true"
      >
        <div class="row">
          <div class="col-3 col-md-2"></div>
          <div class="modal-dialog col-9 col-md-10" role="document">
            <div class="row justify-content-center custom-row">
              <div class="modal-content col-12 col-md-10 col-lg-6">
                <div class="modal-body">
                  <div class="ticket-modal">
                    <input
                      type="text"
                      class="form-control brand-input"
                      :placeholder="strings.topic[lang]"
                      v-model="newTicketData.topic"
                    />
                    <textarea
                      :placeholder="strings.description[lang]"
                      v-model="newTicketData.description"
                    ></textarea>
                    <div class="action">
                      <a href="#" data-dismiss="modal" class="btn btn-brand-styled-bordered">
                        <span>{{strings.cancel[lang]}}</span>
                      </a>
                      <button
                        class="btn btn-brand-styled-bordered"
                        v-on:click="createTicket($event)"
                        v-bind:disabled="newTicketData.topic.length <= 1
                              || newTicketData.description.length <= 1"
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
    </main>
  </div>
</template>

<style scoped lang="less">
#ticketsTab {
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
      color: #b4bbc9;
      padding: 18px;
      border: 0;
      border-radius: 0;
      position: relative;
      &:after {
        content: "";
        display: inline-block;
        position: absolute;
        bottom: 0;
        left: 0;
        height: 6px;
        width: 100%;
        background-color: #449aa3;
        opacity: 0;
        transition: 0.3s ease-in-out;
      }
    }

    .nav-link.active {
      color: #449aa3;
      &:after {
        opacity: 1;
      }
    }
  }
}
.generate-ticket {
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

.no-tickets {
  min-height: 80vh;
  background-image: url("~@/assets/images/no-tickets-bg.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #fff;
  margin: 2rem 0;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  .generate-ticket {
    width: 50%;
    margin: 0 auto;
    border-radius: 50px;
  }
}

a.ticket-wrapper {
  text-decoration: none;
  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
  }

  &:last-child {
    .ticket-item {
      margin-bottom: 3rem;
    }
  }

  .ticket-item {
    background-color: #fff;
    padding: 1.5rem;
    margin-top: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
    .ticket-meta-info {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 20px;
      margin-bottom: 5px;

      .ticket-id {
        color: #4d4f5c;
        font-size: 14px;
        font-weight: 600;
      }

      .generate-date {
        color: #a7a7a7;
        font-size: 12px;
        opacity: 0.4;
      }
    }

    .ticket-details {
      font-size: 14px;
      color: #4d4f5c;
    }
  }
}

.breadcrumb-ticket {
  background-color: #fff;
  border-radius: 6px;
  padding: 1.2rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 16px rgba(69, 91, 99, 0.06);
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  color: #b4bbc9;
  span {
    color: #449aa3;
  }
}

.ticket-modal {
  padding: 0 2rem;
  .brand-input,
  textarea {
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

  textarea {
    border-radius: 10px;
    margin-top: 1.5rem;
    width: 100%;
    resize: none;
    height: 100px;
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
</style>

<script>
import $ from "jquery";
import axios from "axios";
import config from "../config";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import locales from "../locales";

export default {
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      tickets: [],
      newTicketData: {
        topic: "",
        description: ""
      },
      lang: window.localStorage.getItem("kol_user_lang"),
      strings: locales,
      timeOptions: {
        day: "2-digit",
        month: "short",
        dateStyle: "medium",
        timeStyle: "short"
      }
    };
  },
  methods: {
    getTickets() {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      axios({
        method: "get",
        url: `${config.base_url}restaurant-ticket/?limit=100`,
        headers: {
          Authorization: `JWT ${Token}`
        }
      })
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            that.tickets = response.data.results;
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push({ path: "/signin" });
          }
        });
    },
    createTicket(event) {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      event.target.disabled = true;
      axios({
        method: "post",
        url: `${config.base_url}restaurant-ticket/`,
        headers: {
          Authorization: `JWT ${Token}`
        },
        data: that.newTicketData
      })
        .then(response => {
          if (response.status === 201) {
            that.getTickets();
            $("#ticketModal").modal("hide");
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push({ path: "/signin" });
          }
        })
        .finally(() => {
          event.target.disabled = false;
        });
    },
    formatDate(date) {
      const timezone = this.lang === "en" ? "en-US" : "ar-SA";
      return new Date(date).toLocaleString(timezone, this.timeOptions);
    }
  },
  mounted() {
    this.getTickets();
  }
};
</script>
