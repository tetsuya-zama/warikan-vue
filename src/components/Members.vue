<!-- 参加者リストコンポーネント -->
<template>
  <f7-card>
    <f7-card-header>参加者</f7-card-header>
    <f7-card-content>
      <f7-block>
        <f7-list list class="member-list">
         <!-- 
             v-for属性を使用して、参加者の数だけ
             f7-list-itemコンポーネントをレンダリングする
         -->
         <f7-list-item 
          v-for="member in membersForDisplay" 
          :key="member.key"
          :header="member.name"
          :title="member.payment"
          >
           <!-- 削除ボタン 
                @clickイベントでonDeleteClickメソッドに
                対象の参加者のkeyを指定して実行する
           -->
           <div class="delete-button" slot="after" @click="onDeleteClick(member.key)">削除</div>
         </f7-list-item>
         <!-- 端数表示用のf7-list-item -->
         <f7-list-item
          header="端数"
          :title="remainsForDisplay"
         >
         </f7-list-item>
        </f7-list>        
      </f7-block>
      <!-- busインスタンスをMemberAdditionコンポーネントに渡す-->
      <MemberAddition :bus="bus"/>
    </f7-card-content>
  </f7-card>
</template>

<script>

import MemberAddition from '@/components/MemberAddition'

import EVENTS from '@/events/event'

export default {
  name: 'Members', //コンポーネント名
  /**
   * 使用する下位コンポーネント
   **/
  components: {
    MemberAddition //参加者追加コンポーネント
  },
  /**
   * 上位コンポーネントから渡されるpropの定義
   **/
  props:[
    'bus', //busコンポーネント
    'members', //参加者リスト
    'remains' //端数
  ],
  /**
   * コンポーネントメソッドの定義
   **/
  methods: {
    /**
     * 削除ボタンクリック時のイベントハンドラ
     * @param String key 削除対象の参加者key
     **/
    onDeleteClick: function (key){
      /**
       * busインスタンスを通じて
       * 削除対象の参加者keyを渡して
       * DELETE_MEMBERイベントを発火する
       **/
      this.bus.$emit(EVENTS.DELETE_MEMBER,key)
    }
  },
  /**
   * データバインドの前処理の定義
   **/
  computed: {
    /**
     * propsで渡されたmembers(参加者リスト)を
     * 表示用に整形する
     **/
    membersForDisplay: function () {
      /**
       * Numberであるmember.paymentを
       * Stringに整形したリストを作成して返す
       **/
      return this.members
        .map(member => Object.assign(
            {},
            member,
            {
              payment: member.payment.toString()
            }
          ))
    },
    /**
     * propsで渡されたremains(端数)を
     * 表示用に整形する
     **/
    remainsForDisplay: function () {
      /**
       * Numberであるremainsを
       * Stringに変換して返す
       **/
      return this.remains.toString()
    }
  }
}
</script>

<style>
  .delete-button {
    cursor: pointer
  }
</style>