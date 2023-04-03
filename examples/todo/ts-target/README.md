# Todo App using nest.js and the Bitloops Language

## Required software

npm install -g grpc-tools grpc_tools_node_protoc_ts

## To generate the gRPC classes

!!! Note that there is a conflict with protoc and newer TypeScript versions. For now, v4.3.4 can be used without an issue but v4.7.4 breaks things.

https://github.com/thesayyn/protoc-gen-ts/issues/170
https://github.com/microsoft/TypeScript/issues/50259

<!-- grpc_tools_node_protoc \
--js_out=import_style=commonjs,binary:./src/proto \
--grpc_out=grpc_js:./src/proto \
--plugin=protoc-gen-grpc=`which grpc_tools_node_protoc_plugin` \
-I ./src/proto \
./src/proto/todo.proto

protoc \
--plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
--ts_out=grpc_js:./src/proto \
-I ./src/proto \
./src/proto/*.proto

./node_modules/.bin/grpc_tools_node_protoc \
  --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:./src/proto \
  --ts_out=grpc_js:./src/proto \
  --grpc_out=grpc_js:./src/proto \
  --proto_path=./src/proto \
  ./src/proto/todo.proto -->

./node_modules/.bin/grpc_tools_node_protoc --plugin=protoc-gen-grpc=./node_modules/.bin/grpc_tools_node_protoc_plugin --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts --js_out=import_style=commonjs,binary:./src/proto --ts_out=grpc_js:./src/proto --grpc_out=grpc_js:./src/proto --proto_path=./src/proto ./src/proto/todo.proto