<!-- MemberAddition(メンバー追加)コンポーネント -->
<template>
  <f7-block class="member-addition">
    <f7-block-header>参加者を追加</f7-block-header>
    <!-- 参加者名のテキストボックス
         "newMamberName"がデータバインドされており、
         @inputイベント内でインラインでdataを更新している
    -->
    <f7-input 
      type="text" 
      :value="newMemberName" 
      @input="newMemberName = $event.target.value" 
      placeholder="名前"
      ></f7-input>
    <!-- 追加ボタン
         @clickイベントでonAddClickを呼び出す
    -->
    <f7-button @click="onAddClick">追加</f7-button>    
  </f7-block>
</template>

<script>

import EVENTS from '@/events/event'

export default {
  name: 'MemberAddition', //コンポーネント名
  /**
   * このコンポーネントのdata(≒state)を返す
   **/
  data: function () {
    return {newMemberName: ""} //newMemberNameはこのコンポーネント内のみで完結するstate 
  },
  /**
   * 上位コンポーネントから渡されるpropの定義
   **/
  props:["bus"], //busインスタンスのみ
  /**
   * コンポーネントメソッドの定義
   **/
  methods:{
    /**
     * 追加ボタンクリック時のイベントハンドラ
     **/
    onAddClick: function () {
      if (this.newMemberName.trim().length !== 0) {
        /**
         * 参加者名が空でなければ、
         * busインスタンスを通じて新しい参加者名を渡して
         * ADD_MEMBERイベント発火する
         **/
        this.bus.$emit(EVENTS.ADD_MEMBER, this.newMemberName)
      }
    }
  }
}
</script>

<style>
.member-addition {
  margin-top:20px!important;
}
</style>