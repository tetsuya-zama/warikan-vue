<!--メインコンポーネント-->
<template>
  <div id="app">
    <f7-page>
      <f7-navbar title="割り勘計算機"></f7-navbar>
      <!--amount(合計金額)とbusインスタンスをAmountコンポーネントに渡す-->
      <Amount :amount="amount" :bus="bus" />
      <!--members(参加者リスト)とremains(端数)とbusインスタンスをMembersコンポーネントに渡す-->
      <Members :members="members" :remains="remains" :bus="bus" />
    </f7-page>
  </div>
</template>

<script>

import Vue from 'vue'
import Amount from '@/components/Amount'
import Members from '@/components/Members'
import EVENTS from '@/events/event'

/**
 * bus用のVueインスタンス
 * 各コンポーネントからのイベントは
 * このbusを通じて発火される
 **/
const bus = new Vue()

/**
 * このAP全体のstate
 * メインコンポーネントで管理され
 * 下位コンポーネントへはpropsを通じて
 * 伝播する
 **/
const state = {
  bus: bus, //bus用Vueインスタンス
  amount: "", //合計金額の入力値
  members: [], //参加者のリスト
  remains: 0 //端数
}

export default {
  name: 'App',　//コンポーネント名
  components: { //使用する下位コンポーネントのリスト
    Amount, //合計金額コンポーネント
    Members //参加者リストコンポーネント
  },
  /**
   * このコンポーネントのdata(≒state)を返す
   **/
  data: function () {
    return state; //ここでは先に宣言したstateオブジェクトを返す
  },
  /**
   * このコンポーネントが初期化された時に実行されるLifecycle Hook
   **/
  created: function () {
    /**
     * busを通じて下位コンポーネントから発火されるイベントに対する
     * イベントハンドラを定義
     **/
    this.bus.$on(EVENTS.CHANGE_AMOUNT,this.onChangeAmount) //合計金額変更イベント
    this.bus.$on(EVENTS.ADD_MEMBER,this.onAddMember) //参加者追加イベント
    this.bus.$on(EVENTS.DELETE_MEMBER,this.onDeleteMember) //参加者削除イベント
  },
  /**
   * コンポーネントメソッドの定義
   **/
  methods: {
    /**
     * 合計金額変更時のイベントハンドラ
     * @param String amount 変更後の合計金額
     **/
    onChangeAmount: function (amount) {
      this.amount = amount //stateのamount(合計金額)の更新
      /**
       * 1人あたりの支払い金額と端数の再計算
       * 更新後のstateの値を使用する場合は
       * VueComponent#$nextTickのコールバックとして実行する
       **/
      this.$nextTick(() => this._calcPayment())
    },
    /**
     * 参加者追加時のイベントハンドラ
     * @param String memberName 追加する参加者の名前
     */
    onAddMember: function (memberName) {
      const newKey = this._generateMemberKey() //参加者のユニークKeyを生成
      //新しい参加者のオブジェクトを作成
      const newMember = {
        key: newKey, //参加者のユニークキー
        name: memberName, //参加者の名前
        payment: 0 //支払い金額
      }
      this.members.push(newMember) //参加者のリストに追加
      this.$nextTick(() => this._calcPayment()) //支払い金額と端数の再計算
    },
    /**
     * 参加者削除時のイベントハンドラ
     * @param String memberKey 削除する参加者のkey
     **/
    onDeleteMember: function (memberKey) {
      //memberKeyと同じkeyを持つ参加者を除外した新しいリストを作成する
      const newMembers = this.members
        .filter(member => member.key !== memberKey)
      this.members = newMembers //参加者リストごと更新
      this.$nextTick(() => this._calcPayment()) //支払い金額と端数の再計算
    },
    /**
     * 支払い金額と端数の計算
     **/
    _calcPayment: function () {
      const memberCount = this.members.length
      //参加者が一人以上いる時のみ実行する
      if (memberCount !== 0) {
        const amountNum = this.amount !== "" ? Number(this.amount) : 0 //StringのamountをNumberに変換        
        const remains = amountNum % memberCount //端数の計算
        const payment = (amountNum - remains) / memberCount //1人あたりの支払い金額を計算
        
        //支払い金額を更新した新たな参加者リストを作成する
        const newMembers = this.members
          .map(member => Object.assign({}, member, {payment:payment}))
          
        this.members = newMembers //リストごと更新する
        this.remains = remains //端数を更新する
      }
    },
    /**
     * 参加者のユニークKeyの生成
     **/
    _generateMemberKey: function () {
      /**
       * 今いる参加者のkeyの最大値+1を返す
       * リスト内でユニークであれば良いので、
       * 削除された参加者とのkey重複は気にしなくて良い
       **/
      if (this.members.length === 0) {
        return 0;
      } else {
        return Math.max(...this.members.map(member => member.key)) + 1
      }
    }
  }
}
</script>

<style>

</style>
