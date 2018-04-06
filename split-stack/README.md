# Example of splitting stacks. 複数スタック利用サンプルです。

* data-stack
  * a stack that defines data part (a DynamoDB table).
  * データを定義するスタックです。DynamoDBテーブルの定義が入っています。

* lambda-stack
  * a stack that defines a lambda function. references DynamoDB table that created by data-stack.
  * Lambdaを定義するスタックです。data-stackで作られたDynamoDBテーブルを参照します。

# Deploy デプロイ方法

```sh
cd data-stack
sls deploy -v
cd ../lambda-stack
sls deploy -v
```
