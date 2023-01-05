# GraiaCommunity (https://github.com/GraiaCommunity/Docs) b678d2f1f517b19717e5084326c519d05b64af77
# Use of this file is authorized by MIT License.
# Different from the original version.
# The file has been modified for specific requirements.
#
# 依照 MIT License 使用本文件。
# 与原始版本不一致。
# 为满足特定需求，该文件进行了一些修改。

import os
from os.path import basename, exists, join

from fontTools import subset
from fontTools.ttLib import TTFont

origin_path = [join('src'), join('public')]
ignore_dirs = ['dist', '.DS_Store', 'assets']
white_endswith = ['.vue', '.md', '.txt', '.html', '.js', '.json', '.ts', '.scss', '.css', 'footstone']
out_path = join('fonts')
font = join('scripts', 'HarmonyOS_Sans_SC.ttf')

content = ''


def read(path):
    global content
    global white_endswith

    for root, dirs, files in os.walk(path):
        if basename(root) in ignore_dirs:
            dirs[:] = []  # 忽略当前目录下的子目录
            continue

        for f in files:
            for e in white_endswith:
                if f.endswith(e):
                    print(f'正在读取 {join(root, f)}')
                    with open(join(root, f), 'r', encoding='utf8') as file:
                        while True:
                            if char := file.read(1):
                                content += f'{char}\n'
                            else:
                                break


print('读取文件中...')
for op in origin_path:
    read(op)

print(f'正在处理 {font}')

if not exists(out_path):
    os.mkdir(out_path)

f = TTFont(font)

subsetter = subset.Subsetter()

subsetter.populate(text=content)
subsetter.subset(f)
f.flavor = 'woff2'
f.save(join(out_path, 'Harmony.min.woff2'))
