#!/bin/bash
cd -- "$(dirname -- "$0")" || exit 1
python3 server.py --library "$(dirname -- "$PWD")/全栈面试题库"
read -r -p '按回车关闭窗口…'
