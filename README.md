# 割り勘計算機を修正してみよう

## 問題

### 初級
#### 問題1
今の仕様では、新しい参加者の名前を入力して「追加」ボタンをクリックした際、
入力した名前がテキストボックスにそのまま残ってしまいます。

利便性を考慮し、src/components/MemberAddition.vueを修正して、参加者を追加した際にテキストボックスを空にしてください。

#### 問題2
今の仕様では、端数が0円の場合でも端数が表示されてしまいます。

以下のURLを参考にしながら、
src/components/Members.vueを修正して、
端数が0円の場合は端数を表示しないよう修正してください。

*参考URL*

https://jp.vuejs.org/v2/guide/conditional.html

#### 問題3
今の仕様では、1人あたりの支払い金額や端数が数値そのままで表示されてしまいます。

以下のURLを参考にしながら、
src/components/Members.vueを修正して
支払い金額と端数を日本円の通貨表記(例:¥10,000)で表示するようにしてください。

ただし、実行ブラウザはGoogle Chromeを対象にし、その他のブラウザでの稼働は保証しなくても構いません。

*参考URL*

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString


### 中級

#### 問題4
今の仕様では、削除ボタンを押してすぐに参加者が削除されてしまいます。

src/components/Members.vueを修正し、削除しようとしている参加者の名前を$nameとした時、
```
$nameさんを削除します。よろしいですか？
```
という[確認ダイアログ](https://developer.mozilla.org/ja/docs/Web/API/Window/confirm)を表示して、
OKが押された場合のみ削除を実行するようにしてください。

#### 問題5
今の仕様では、合計金額欄は単位が日本円であるにも関わらず、
負の数や小数が入力できてしまいます。

src/App.vueを修正して、

* 負の数を入力された場合は正の数に
* 小数を入力された場合は小数点以下を切り捨てに

変換してから計算するようにしてください。

また、合計金額欄の表示に表示する数値も上記の通り変換してください。

#### 問題6
今の仕様では、1円単位で割り勘して端数を計算しています。

src/App.vueを修正して、100円単位で割り勘して端数を計算するようにしてください。

##### 例

合計金額 ¥981

参加者 2人(Aさん、Bさん)

割り勘結果

* Aさん：¥400
* Bさん : ¥400
* 端数 : ¥181

### 上級

#### 問題7
問題３では一人当たりの支払い金額と端数のみ通貨表記(例：¥10,000)にしましたが、
合計金額欄が通貨表記になっていません。

そこで、src/components/Amount.vueを修正して、

* テキストの入力中（focusが当たっている時）は数値表記(例：10000)
* テキストの入力完了後(focusが外れている時)は日本円の通貨表記(例：¥10,000)

となるようにしてください。

ただし、問題３と同じく、
実行ブラウザはGoogle Chromeを対象にし、その他のブラウザでの稼働は保証しなくても構いません。

## 環境構築とデバッグ手順

### シンガポールリージョン（ap-southeast-1）のAWS Cloud9の場合

#### 環境構築
##### GitHubからソースをclone
```bash
$ git clone https://github.com/tetsuya-zama/warikan-vue.git
```

##### npm install
```bash
$ cd warikan-vue
$ npm install
```

#### デバッグ
##### webpack-dev-serverの立ち上げ
```bash
$ npm start
```

* EC2インスタンス内のlocalhost:8080にwebpack-dev-serverが立ち上がる
* 立ち上げた状態でソースを更新すると自動的にコンパイルされてブラウザ上も更新される(hot loading)
* 止める時はターミナルにfocusしてctrl+C

##### Cloud9のPreview機能でデバッグ
webpack-dev-serverが立ち上がった状態でCloud9の上部メニューの"Preview"->"Preview Running Application"を
クリックするとデバッグ用のブラウザペインが立ち上がる。

ブラウザペインはかなり小さいので、アドレスバー右横の"Pop up into new window"アイコンをクリックし、
自分のブラウザの別タブで表示した方が便利

ブラウザペインの右上のxボタンで閉じようとすると、
ターミナルペインごと消えてしまって復旧が面倒。
タブ名の横にあるxボタンでタブを閉じること。

間違えてターミナルペインを消してしまった場合は、"Window"->"Tabs"から
ターミナル名(bash - "ip-xxx-xxx-xxx-xxx"もしくはnpm - "ip-xxx-xxx-xxx-xxx")を
クリックすると復旧できる。

### シンガポールリージョン以外のAWS Cloud9の場合
GitHubからcloneしたあと、package.jsonの8行目
```javascript
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --public ${C9_PID}.vfs.cloud9.ap-southeast-1.amazonaws.com",
```
の中の"ap-southeast-1"の部分を使用するリージョンに書き換える。

それ以外はシンガポールリージョンの場合と同様。

### それ以外の環境(自身のローカルマシンなど)の場合
#### 直接localhost:8080でデバッグする場合
GitHubからcloneしたあと、package.jsonの8行目
```javascript
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --public ${C9_PID}.vfs.cloud9.ap-southeast-1.amazonaws.com",
```
の中の"--public ${C9_PID}.vfs.cloud9.ap-southeast-1.amazonaws.com"を削除する。

npm installした後、
```bash
$ npm start
```
でwebpack-dev-serverが立ち上がるので、直接localhost:8080にアクセスしてデバッグする

#### リバースプロキシ配下など、localhost:8080以外でデバッグする場合
GitHubからcloneしたあと、package.jsonの8行目
```javascript
"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js --public ${C9_PID}.vfs.cloud9.ap-southeast-1.amazonaws.com",
```
の中の"${C9_PID}.vfs.cloud9.ap-southeast-1.amazonaws.com"を利用するFQDNに書き換える。

npm installした後、
```bash
$ npm start
```
でwebpack-dev-serverが立ち上がるので、指定したFQDNにアクセスしてデバッグする。








