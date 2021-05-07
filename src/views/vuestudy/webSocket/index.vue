<template>
  <div>
    <div class="container">
      <h1>Stock Chart over WebSocket</h1>
      <button class="btn btn-primary" @click="connect">连接socket</button>
      <button class="btn btn-danger" @click="sendMessage">发送数据</button>
      <button @click="close">断开连接</button>
    </div>
  </div>
</template>

<script>
export default {
  sockets: {
    welcome: data => {
      console.log('welcome事件获取数据', data);
    }
  },
  methods: {
    // 连接socket
    connect() {
      this.$socket.open();
      console.log(this.sockets, 'sockets')
      // 接收服务端消息
      this.sockets.subscribe('welcome', (data) => {
        console.log('welcome data', data);
      })
    },
    sendMessage() {
      // 发送信息给服务端
      this.$socket.emit('hello', '这里是客户端')
    },
    close() {
      // 断开socket连接
      this.$socket.close();
    }
  }
}
</script>

<style scoped>

</style>
