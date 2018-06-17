<!-- 合計金額コンポーネント -->
<template>
  <f7-card>
    <f7-card-header>合計金額</f7-card-header>
    <f7-card-content>
      <!-- 合計金額入力欄
           propsで渡された'amount'がデータバインドされており、
           @inputイベントでonTextChangeメソッドを呼び出す
      -->
      <f7-input 
        class='amount' 
        :value='amount' 
        type="number" 
        placeholder="合計金額を日本円で入力してください" 
        clear-button 
        @input="onTextChange"
        ></f7-input>
    </f7-card-content>
  </f7-card>
</template>

<script>

import EVENTS from '@/events/event'

export default {
  name: 'Amount', //コンポーネント名
  /**
   * 上位コンポーネントから渡されるpropの定義
   **/
  props: [
    'bus', //busインスタンス
    'amount' //合計金額
  ],
  /**
   * コンポーネントメソッドの定義
   **/
  methods: {
    /**
     * 合計金額欄変更時のイベントハンドラ
     * @param Object $event 変更イベント
     **/
    onTextChange: function ($event) {
      /**
       * busインスタンスを通じて
       * 変更後の値($event.target,value)を渡して
       * CHANGE_AMOUNTイベントを発火する
       **/
      this.bus.$emit(EVENTS.CHANGE_AMOUNT, $event.target.value)
    }
  }
}
</script>

<style>
.amount input {
  width:100%;
  font-size:x-large;
}
</style>