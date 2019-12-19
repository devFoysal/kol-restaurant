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
                <div class="breadcrumb-ticket">
                  <span>Home</span> /
                  <span>Generate Ticket</span>
                  / Ticket ID : {{ticketId}}
                </div>
                <div class="ticket-details-chat">
                  <div class="chat-row theirs" v-for="message in messages" :key="message.id">
                    <div class="message-meta">
                      <div class="username">Riyadh Marriott Hotel</div>
                      <div class="time">2 days, 20min ago</div>
                    </div>
                    <div class="message">
                      Hey Kol, I have a question regarding my
                      account.
                      <br />Do you have time for a call?
                    </div>
                  </div>

                  <div class="chat-row ours">
                    <div class="message-meta">
                      <div class="username">Admin</div>
                      <div class="time">2h ago</div>
                    </div>
                    <div class="message">Hi, how can I help you?</div>
                  </div>
                </div>

                <div class="ticket-chat-new">
                  <input
                    type="text"
                    name="newMessageText"
                    class="form-control brand-input"
                    placeholder="Type your message here..."
                    v-model="newMessageText"
                  />
                  <a v-on:click="sendMessages" href="#" class="btn btn-brand-styled-bordered">
                    <span>Send</span>
                  </a>
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

.ticket-details-chat {
  display: flex;
  flex-direction: column;
  max-height: 60vh;
  overflow-y: scroll;
  .chat-row {
    display: inline-block;
    margin-bottom: 1.5rem;
    .message-meta {
      font-size: 10px;
      line-height: 13px;
      color: #454f63;
      opacity: 0.6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
    }
    .message {
      padding: 10px 15px;
      font-size: 12px;
      line-height: 20px;
    }
  }

  .chat-row.theirs {
    align-self: flex-end;
    .message {
      background-color: #fff;
      color: #454f63;
      border-radius: 10px 10px 0 10px;
    }
  }

  .chat-row.ours {
    align-self: flex-start;
    .message {
      background-color: #4ebac5;
      color: #fff;
      border-radius: 10px 10px 10px 0;
    }
  }
}

.ticket-chat-new {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;
  input {
    font-size: 14px;
    padding: 0.8rem 1.5rem;
    border-radius: 40px;
    height: auto;
    border: 1px solid #449aa3;
    &::placeholder {
      color: #e4e4e4;
    }
  }

  .btn.btn-brand-styled-bordered {
    margin: 0 0 0 25px;
    min-width: 25%;
  }
}
html[dir="rtl"] {
  .ticket-details-chat {
    .chat-row.theirs {
      .message {
        border-radius: 10px 10px 10px 0;
      }
    }

    .chat-row.ours {
      .message {
        border-radius: 10px 10px 0 10px;
      }
    }
  }
  .ticket-chat-new {
    .btn.btn-brand-styled-bordered {
      margin: 0 25px 0 0;
    }
  }
}
</style>

<script>
import axios from "axios";
import config from "../config";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Header,
    Navbar
  },
  data() {
    return {
      ticketId: this.$route.params.id,
      messages: [],
      newMessageText: ""
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

    scrollChatToBottom() {
      const chatBox = window.document.getElementsByClassName(
        "ticket-details-chat"
      )[0];
      chatBox.scrollTo({ top: chatBox.getBoundingClientRect().height });
    },
    getMessages() {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      axios({
        method: "get",
        url: `${config.base_url}restaurant-ticket-message/${that.ticketId}/`,
        headers: {
          Authorization: `JWT ${Token}`
        }
      })
        .then(response => {
          console.log("get new message", response);
          if (response.status === 200) {
            that.messages = response.data.results;
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.$router.push({ path: "/signin" });
          }
        });
    },

    sendMessages() {
      const Token = JSON.parse(window.localStorage.getItem("kol_keys")).access;
      const that = this;
      const newMessage = new FormData();
      // newMessage.append("sender", that.newFoodItem.name);
      newMessage.append("ticket", this.ticketId);
      newMessage.append("text", that.newMessageText);
      // this.checkFormData(newMessage);
      // return false;
      axios({
        method: "post",
        url: `${config.base_url}restaurant-ticket-message/${that.ticketId}`,
        headers: {
          Authorization: `JWT ${Token}`
        },
        data: {
          text: that.newMessageText
        }
      })
        .then(response => {
          console.log("new message added", response);
          // if (response.status === 201) {
          //     console.log("new food added", response);

          // }
          this.getMessages();
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  },
  mounted() {
    this.scrollChatToBottom();
    this.getMessages();
  }
};
</script>
