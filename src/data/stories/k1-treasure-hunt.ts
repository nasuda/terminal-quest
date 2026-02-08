import type { Story, FSNode } from '../types.js';

// ミッション1: 冒険のはじまり
const mission1FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        スタート地点: {
          type: 'directory',
          children: {
            '案内板.txt': {
              type: 'file',
              content:
                'ようこそ、冒険の世界へ！\nここからきみの冒険がはじまるよ。\nまずは、いまいる場所をたしかめてみよう！\n',
            },
          },
        },
        魔法の森: {
          type: 'directory',
          children: {},
        },
        古いお城: {
          type: 'directory',
          children: {},
        },
      },
    },
  },
};

// ミッション2: 森を冒険しよう
const mission2FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        スタート地点: {
          type: 'directory',
          children: {
            '案内板.txt': {
              type: 'file',
              content:
                'ようこそ、冒険の世界へ！\nここからきみの冒険がはじまるよ。\nまずは、いまいる場所をたしかめてみよう！\n',
            },
          },
        },
        魔法の森: {
          type: 'directory',
          children: {
            '光る花.txt': {
              type: 'file',
              content: 'きれいに光る花だ。さわるとあたたかい。\n',
            },
            '古い巻物.txt': {
              type: 'file',
              content:
                'この巻物には古い言い伝えが書いてある。\n『北の洞窟に宝が眠る』\n',
            },
            'ヒント.txt': {
              type: 'file',
              content: '森を抜けたら、スタート地点に戻ってこよう。\n',
            },
          },
        },
      },
    },
  },
};

// ミッション3: 秘密基地を作ろう
const mission3FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        スタート地点: {
          type: 'directory',
          children: {},
        },
      },
    },
  },
};

// ミッション4: 宝物を集めよう
const mission4FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        魔法の森: {
          type: 'directory',
          children: {
            '光る宝石.txt': {
              type: 'file',
              content: 'キラキラ光る美しい宝石だ。\n',
            },
          },
        },
        古いお城: {
          type: 'directory',
          children: {
            宝物庫: {
              type: 'directory',
              children: {
                '伝説の剣.txt': {
                  type: 'file',
                  content: '古代の勇者が使っていた伝説の剣だ。\n',
                },
              },
            },
          },
        },
        秘密基地: {
          type: 'directory',
          children: {
            宝物庫: {
              type: 'directory',
              children: {},
            },
          },
        },
      },
    },
  },
};

// ミッション5: トラップを片付けよう
const mission5FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        ひみつの洞窟: {
          type: 'directory',
          children: {
            'トラップ1.txt': {
              type: 'file',
              content: '⚠ これはトラップだ！さわると大変！\n',
            },
            'トラップ2.txt': {
              type: 'file',
              content: '⚠ これはトラップだ！さわると大変！\n',
            },
            'たからの地図.txt': {
              type: 'file',
              content: '宝はこの洞窟の奥にあるらしい。\n',
            },
            奥の部屋: {
              type: 'directory',
              children: {
                'トラップ3.txt': {
                  type: 'file',
                  content: '⚠ これはトラップだ！さわると大変！\n',
                },
                '宝箱.txt': {
                  type: 'file',
                  content:
                    'おめでとう！宝箱を見つけた！\n中には金貨がたくさん入っている。\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション6: 暗号を解読しよう
const mission6FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        ひみつの洞窟: {
          type: 'directory',
          children: {
            '暗号文.txt': {
              type: 'file',
              content: [
                'むかしむかし、ある国に王様がいました。',
                '王様はとても優しい人でした。',
                'ある日、魔法使いがやってきました。',
                '魔法使いは王様に宝の地図をわたしました。',
                'そして二人は旅に出ました。',
                '冒険の終わりに、大きな宝物を見つけました。',
              ].join('\n') + '\n',
            },
          },
        },
      },
    },
  },
};

// ミッション7: 古い書物を読もう
const magicBookContent = [
  '=== 魔法の書 ===',
  '',
  '第一章　火の魔法',
  'ファイアボール：火の玉をとばす',
  'フレイムウォール：火のかべをつくる',
  '',
  '第二章　水の魔法',
  'アクアストリーム：水の流れをおこす',
  'アイスシールド：氷のたてをつくる',
  '',
  '第三章　風の魔法',
  'ウィンドカッター：風の刃をとばす',
  'エアシールド：風のバリアをはる',
  '',
  '第四章　土の魔法',
  'ロックスロー：岩を投げる',
  'アースウォール：土のかべをつくる',
  '',
  '第五章　光の魔法',
  'ホーリーライト：聖なる光でてらす',
  'ヒーリング：きずをなおす',
].join('\n') + '\n';

const mission7FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        古いお城: {
          type: 'directory',
          children: {
            図書室: {
              type: 'directory',
              children: {
                '魔法の書.txt': {
                  type: 'file',
                  content: magicBookContent,
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション8: 仲間リストを整理しよう
const mission8FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        古いお城: {
          type: 'directory',
          children: {
            '冒険者名簿.csv': {
              type: 'file',
              content: [
                '名前,職業,レベル',
                'たけし,戦士,15',
                'さくら,魔法使い,20',
                'たけし,戦士,15',
                'ゆうき,勇者,25',
                'さくら,魔法使い,20',
                'ひなた,僧侶,18',
                'ゆうき,勇者,25',
                'たけし,戦士,15',
              ].join('\n') + '\n',
            },
          },
        },
      },
    },
  },
};

// ミッション9: 封印を解こう
const mission9FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        古いお城: {
          type: 'directory',
          children: {
            '封印の呪文.sh': {
              type: 'file',
              content: '#!/bin/bash\necho "封印が解けた！大きな扉が開く！"\n',
              permissions: '-rw-r--r--',
            },
            '魔法の石.txt': {
              type: 'file',
              content:
                '火の魔法\n水の魔法\n風の魔法\n土の魔法\n光の魔法\n闇の魔法\n',
            },
            '魔法の杖.txt': {
              type: 'file',
              content: '古代の杖 - すべての魔法を増幅する\n',
            },
          },
        },
      },
    },
  },
};

// ミッション10: 冒険の記録をつけよう
const gitLogContent = [
  'commit f1a2b3c (HEAD -> main)',
  'Author: 冒険者 <adventurer@example.com>',
  'Date:   Mon Jan 15 10:00:00 2024',
  '',
  '    秘密基地をつくった',
  '',
  'commit d4e5f6g',
  'Author: 冒険者 <adventurer@example.com>',
  'Date:   Mon Jan 15 09:00:00 2024',
  '',
  '    宝物を集めた',
  '',
  'commit h7i8j9k',
  'Author: 冒険者 <adventurer@example.com>',
  'Date:   Mon Jan 15 08:00:00 2024',
  '',
  '    冒険をはじめた',
].join('\n');

const gitStatusOutput = [
  'On branch main',
  'Changes not staged for commit:',
  '  (use "git add <file>..." to update what will be committed)',
  '  (use "git restore <file>..." to discard changes in working directory)',
  '',
  '\tmodified:   冒険日記.txt',
  '',
  'no changes added to commit (use "git add" to track)',
].join('\n');

const mission10FS: FSNode = {
  type: 'directory',
  children: {
    冒険の世界: {
      type: 'directory',
      children: {
        秘密基地: {
          type: 'directory',
          children: {
            '.git': {
              type: 'directory',
              children: {
                HEAD: {
                  type: 'file',
                  content: 'ref: refs/heads/main',
                },
                branches: {
                  type: 'file',
                  content: '* main',
                },
                log: {
                  type: 'file',
                  content: gitLogContent,
                },
                'status-output': {
                  type: 'file',
                  content: gitStatusOutput,
                },
              },
            },
            '冒険日記.txt': {
              type: 'file',
              content:
                '今日は秘密基地で冒険の記録をまとめた。\n新しい仲間もできた。\n明日はもっと遠くへ冒険しよう。\n',
            },
          },
        },
      },
    },
  },
};

export const storyK1: Story = {
  id: 'story-k1',
  title: 'たからさがし大冒険',
  description:
    'きみは冒険者！ふしぎな世界をたんけんして、たからものを見つけよう。ターミナルのコマンドをつかって、冒険をすすめていくよ。',
  emoji: '✨',
  course: 'kids',
  missions: [
    // ミッション1: 冒険のはじまり
    {
      id: 'mission-k1-01',
      title: '冒険のはじまり',
      description:
        'いまいる場所をたしかめて、まわりを見てみよう！',
      narrative:
        'きみは冒険の世界にやってきた！スタート地点にいるみたいだけど、ここはどこだろう？まずは「いまいる場所」をたしかめて、まわりに何があるか見てみよう。',
      initialCwd: '/冒険の世界/スタート地点',
      initialFS: mission1FS,
      newCommands: ['pwd', 'ls'],
      objectives: [
        {
          id: 'obj-k1-01-01',
          description: 'いまいる場所をたしかめよう（pwd コマンド）',
          checks: [{ type: 'command_executed', command: 'pwd' }],
          hints: [
            { level: 1, text: 'いまいる場所を知るコマンドがあるよ。' },
            { level: 2, text: '「pwd」っていう3文字のコマンドだよ。' },
            { level: 3, text: '「pwd」とにゅうりょくして Enter をおしてね。' },
          ],
        },
        {
          id: 'obj-k1-01-02',
          description: 'まわりに何があるか見てみよう（ls コマンド）',
          checks: [{ type: 'command_executed', command: 'ls' }],
          hints: [
            { level: 1, text: 'まわりにあるものを見るコマンドがあるよ。' },
            { level: 2, text: '「ls」っていう2文字のコマンドだよ。' },
            { level: 3, text: '「ls」とにゅうりょくして Enter をおしてね。' },
          ],
        },
      ],
    },
    // ミッション2: 森を冒険しよう
    {
      id: 'mission-k1-02',
      title: '森を冒険しよう',
      description:
        '魔法の森にいって、古い巻物を読んでみよう！',
      narrative:
        '案内板に「魔法の森には何かひみつがある」と書いてあった。森にいって、手がかりをさがそう！巻物を読んだら、スタート地点にもどってこよう。',
      initialCwd: '/冒険の世界/スタート地点',
      initialFS: mission2FS,
      newCommands: ['cd', 'cat'],
      objectives: [
        {
          id: 'obj-k1-02-01',
          description: '魔法の森にいどうしよう',
          checks: [{ type: 'cwd_equals', path: '/冒険の世界/魔法の森' }],
          hints: [
            { level: 1, text: 'べつの場所にいどうするコマンドがあるよ。' },
            { level: 2, text: '「cd」のあとに、いきたい場所の名前を書くよ。' },
            { level: 3, text: '「cd /冒険の世界/魔法の森」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-02-02',
          description: '古い巻物を読んでみよう',
          checks: [{ type: 'output_contains', pattern: '宝' }],
          hints: [
            { level: 1, text: 'ファイルの中身を読むコマンドがあるよ。' },
            { level: 2, text: '「cat」のあとにファイル名を書くと、中身が読めるよ。' },
            { level: 3, text: '「cat 古い巻物.txt」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-02-03',
          description: 'スタート地点にもどろう',
          checks: [{ type: 'cwd_equals', path: '/冒険の世界/スタート地点' }],
          hints: [
            { level: 1, text: 'さっきつかった「cd」コマンドでもどれるよ。' },
            { level: 2, text: 'スタート地点のフルパスを指定しよう。' },
            { level: 3, text: '「cd /冒険の世界/スタート地点」とにゅうりょくしてね。' },
          ],
        },
      ],
    },
    // ミッション3: 秘密基地を作ろう
    {
      id: 'mission-k1-03',
      title: '秘密基地を作ろう',
      description:
        'じぶんだけの秘密基地をつくろう！部屋もつくって、ノートもおこう。',
      narrative:
        '冒険には秘密基地がひつようだ！まずは基地をつくって、たからものをしまう部屋と、冒険のきろくをつけるノートを用意しよう。',
      initialCwd: '/冒険の世界',
      initialFS: mission3FS,
      newCommands: ['mkdir', 'touch'],
      objectives: [
        {
          id: 'obj-k1-03-01',
          description: '秘密基地をつくろう',
          checks: [{ type: 'file_exists', path: '/冒険の世界/秘密基地' }],
          hints: [
            { level: 1, text: 'あたらしいフォルダをつくるコマンドがあるよ。' },
            { level: 2, text: '「mkdir」のあとにフォルダの名前を書くよ。' },
            { level: 3, text: '「mkdir 秘密基地」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-03-02',
          description: '秘密基地の中に宝物庫をつくろう',
          checks: [{ type: 'file_exists', path: '/冒険の世界/秘密基地/宝物庫' }],
          hints: [
            { level: 1, text: '秘密基地の中にもうひとつフォルダをつくろう。' },
            { level: 2, text: '「mkdir」でパスを指定して、中にフォルダがつくれるよ。' },
            { level: 3, text: '「mkdir 秘密基地/宝物庫」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-03-03',
          description: '冒険ノートをつくろう',
          checks: [
            { type: 'file_exists', path: '/冒険の世界/秘密基地/冒険ノート.txt' },
          ],
          hints: [
            { level: 1, text: 'からっぽのファイルをつくるコマンドがあるよ。' },
            { level: 2, text: '「touch」のあとにファイル名を書くと、ファイルがつくれるよ。' },
            { level: 3, text: '「touch 秘密基地/冒険ノート.txt」とにゅうりょくしてね。' },
          ],
        },
      ],
    },
    // ミッション4: 宝物を集めよう
    {
      id: 'mission-k1-04',
      title: '宝物を集めよう',
      description:
        'いろんな場所にある宝物を秘密基地にあつめよう！',
      narrative:
        '冒険の世界にはたからものがいっぱい！魔法の森にある宝石をコピーして、古いお城にある伝説の剣を秘密基地にうつそう。',
      initialCwd: '/冒険の世界',
      initialFS: mission4FS,
      newCommands: ['cp', 'mv'],
      objectives: [
        {
          id: 'obj-k1-04-01',
          description: '光る宝石を秘密基地にコピーしよう',
          checks: [
            {
              type: 'file_exists',
              path: '/冒険の世界/秘密基地/宝物庫/光る宝石.txt',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをコピーするコマンドがあるよ。' },
            { level: 2, text: '「cp」のあとに「もとのファイル」「コピーさき」を書くよ。' },
            {
              level: 3,
              text: '「cp 魔法の森/光る宝石.txt 秘密基地/宝物庫/光る宝石.txt」とにゅうりょくしてね。',
            },
          ],
        },
        {
          id: 'obj-k1-04-02',
          description: '伝説の剣を秘密基地にうつそう',
          checks: [
            {
              type: 'file_exists',
              path: '/冒険の世界/秘密基地/宝物庫/伝説の剣.txt',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをべつの場所にうつすコマンドがあるよ。' },
            { level: 2, text: '「mv」のあとに「もとのファイル」「うつしさき」を書くよ。コピーとちがって、もとのファイルはなくなるよ。' },
            {
              level: 3,
              text: '「mv 古いお城/宝物庫/伝説の剣.txt 秘密基地/宝物庫/伝説の剣.txt」とにゅうりょくしてね。',
            },
          ],
        },
      ],
    },
    // ミッション5: トラップを片付けよう
    {
      id: 'mission-k1-05',
      title: 'トラップを片付けよう',
      description:
        'ひみつの洞窟にしかけられたトラップを見つけて、かたづけよう！',
      narrative:
        'ひみつの洞窟にはトラップがしかけてある！まずはトラップがどこにあるか見つけて、ぜんぶかたづけよう。そうすれば安全にたからものがとれるよ。',
      initialCwd: '/冒険の世界/ひみつの洞窟',
      initialFS: mission5FS,
      newCommands: ['rm', 'find'],
      objectives: [
        {
          id: 'obj-k1-05-01',
          description: 'トラップをさがそう',
          checks: [{ type: 'output_contains', pattern: 'トラップ' }],
          hints: [
            { level: 1, text: 'ファイルをさがすコマンドがあるよ。' },
            { level: 2, text: '「find」コマンドで名前をしていしてさがせるよ。' },
            {
              level: 3,
              text: '「find . -name トラップ*」とにゅうりょくしてね。',
            },
          ],
        },
        {
          id: 'obj-k1-05-02',
          description: 'トラップ1をけそう',
          checks: [
            {
              type: 'file_not_exists',
              path: '/冒険の世界/ひみつの洞窟/トラップ1.txt',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをけすコマンドがあるよ。' },
            { level: 2, text: '「rm」のあとにけしたいファイル名を書くよ。' },
            { level: 3, text: '「rm トラップ1.txt」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-05-03',
          description: 'トラップ2をけそう',
          checks: [
            {
              type: 'file_not_exists',
              path: '/冒険の世界/ひみつの洞窟/トラップ2.txt',
            },
          ],
          hints: [
            { level: 1, text: 'さっきとおなじようにけしてみよう。' },
            { level: 2, text: '「rm」コマンドをつかおう。' },
            { level: 3, text: '「rm トラップ2.txt」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-05-04',
          description: '奥の部屋のトラップ3もけそう',
          checks: [
            {
              type: 'file_not_exists',
              path: '/冒険の世界/ひみつの洞窟/奥の部屋/トラップ3.txt',
            },
          ],
          hints: [
            { level: 1, text: '奥の部屋の中にあるファイルもけせるよ。' },
            { level: 2, text: 'パスを指定すればべつのフォルダの中のファイルもけせるよ。' },
            { level: 3, text: '「rm 奥の部屋/トラップ3.txt」とにゅうりょくしてね。' },
          ],
        },
      ],
    },
    // ミッション6: 暗号を解読しよう
    {
      id: 'mission-k1-06',
      title: '暗号を解読しよう',
      description:
        '暗号文から手がかりをさがして、けっかを書きのこそう！',
      narrative:
        '洞窟のおくで暗号文を見つけた！この中に「魔法」というキーワードがかくれているらしい。さがしだして、わかったことを書きのこそう。',
      initialCwd: '/冒険の世界/ひみつの洞窟',
      initialFS: mission6FS,
      newCommands: ['grep', 'echo'],
      objectives: [
        {
          id: 'obj-k1-06-01',
          description: '暗号文から「魔法」という言葉をさがそう',
          checks: [{ type: 'output_contains', pattern: '魔法' }],
          hints: [
            { level: 1, text: 'ファイルの中からことばをさがすコマンドがあるよ。' },
            { level: 2, text: '「grep」のあとにさがしたいことばとファイル名を書くよ。' },
            { level: 3, text: '「grep 魔法 暗号文.txt」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-06-02',
          description: 'かいどくけっかをファイルに書こう',
          checks: [
            {
              type: 'file_exists',
              path: '/冒険の世界/ひみつの洞窟/解読結果.txt',
            },
          ],
          hints: [
            { level: 1, text: 'もじをファイルに書きこむコマンドがあるよ。' },
            { level: 2, text: '「echo」と「>」をつかうと、もじをファイルに書けるよ。' },
            {
              level: 3,
              text: '「echo "魔法使いが宝の地図をくれた" > 解読結果.txt」とにゅうりょくしてね。',
            },
          ],
        },
      ],
    },
    // ミッション7: 古い書物を読もう
    {
      id: 'mission-k1-07',
      title: '古い書物を読もう',
      description:
        'ながい魔法の書の最初と最後をかくにんして、何ページあるかかぞえよう！',
      narrative:
        '古いお城の図書室で、ぶあつい魔法の書を見つけた！ぜんぶ読むのは大変だから、最初と最後だけ読んで、ページ数もかくにんしよう。',
      initialCwd: '/冒険の世界/古いお城/図書室',
      initialFS: mission7FS,
      newCommands: ['head', 'tail', 'wc'],
      objectives: [
        {
          id: 'obj-k1-07-01',
          description: '魔法の書のさいしょの部分を読もう',
          checks: [{ type: 'command_executed', command: 'head' }],
          hints: [
            { level: 1, text: 'ファイルのさいしょだけ読むコマンドがあるよ。' },
            { level: 2, text: '「head」コマンドをつかうと、ファイルのさいしょの方だけ見られるよ。' },
            { level: 3, text: '「head 魔法の書.txt」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-07-02',
          description: '魔法の書のさいごの部分を読もう',
          checks: [{ type: 'command_executed', command: 'tail' }],
          hints: [
            { level: 1, text: 'ファイルのさいごだけ読むコマンドがあるよ。' },
            { level: 2, text: '「tail」コマンドをつかうと、ファイルのさいごの方だけ見られるよ。' },
            { level: 3, text: '「tail 魔法の書.txt」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-07-03',
          description: '魔法の書が何行あるかかぞえよう',
          checks: [
            { type: 'command_executed', command: 'wc' },
            { type: 'output_contains', pattern: '20' },
          ],
          hints: [
            { level: 1, text: 'ファイルの行数をかぞえるコマンドがあるよ。' },
            { level: 2, text: '「wc」コマンドをつかうと、行の数がわかるよ。' },
            { level: 3, text: '「wc 魔法の書.txt」とにゅうりょくしてね。' },
          ],
        },
      ],
    },
    // ミッション8: 仲間リストを整理しよう
    {
      id: 'mission-k1-08',
      title: '仲間リストを整理しよう',
      description:
        '冒険者の名簿をきれいに整理しよう！',
      narrative:
        '古いお城で冒険者の名簿を見つけた。でも同じ名前が何回も書いてある。きれいに整理して、どんな職業の仲間がいるか調べよう。',
      initialCwd: '/冒険の世界/古いお城',
      initialFS: mission8FS,
      newCommands: ['sort', 'uniq', 'cut'],
      objectives: [
        {
          id: 'obj-k1-08-01',
          description: '名簿をじゅんばんにならべよう',
          checks: [{ type: 'command_executed', command: 'sort' }],
          hints: [
            { level: 1, text: 'ならびかえるコマンドがあるよ。' },
            { level: 2, text: '「sort」コマンドで行をじゅんばんにできるよ。' },
            { level: 3, text: '「sort 冒険者名簿.csv」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-08-02',
          description: 'おなじ行をまとめよう',
          checks: [{ type: 'command_executed', command: 'uniq' }],
          hints: [
            { level: 1, text: 'おなじものをまとめるコマンドがあるよ。パイプ「|」もつかってみよう。' },
            { level: 2, text: '「sort」したあとに「|」で「uniq」につなげると、おなじ行をまとめられるよ。' },
            { level: 3, text: '「sort 冒険者名簿.csv | uniq」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-08-03',
          description: '職業だけをとりだそう',
          checks: [{ type: 'output_contains', pattern: '職業' }],
          hints: [
            { level: 1, text: 'とくていの部分だけきりだすコマンドがあるよ。' },
            { level: 2, text: '「cut」コマンドで「,」でくぎって2ばんめの部分をとりだせるよ。' },
            {
              level: 3,
              text: '「cut -d, -f2 冒険者名簿.csv」とにゅうりょくしてね。',
            },
          ],
        },
      ],
    },
    // ミッション9: 封印を解こう
    {
      id: 'mission-k1-09',
      title: '封印を解こう',
      description:
        'ふういんされた呪文をとけるようにして、魔法をつかおう！',
      narrative:
        '古いお城のおくで、ふういんされた呪文を見つけた！ふういんを解いて実行できるようにしよう。そして魔法の石から、つかいたい魔法をえらびだそう。',
      initialCwd: '/冒険の世界/古いお城',
      initialFS: mission9FS,
      newCommands: ['chmod'],
      objectives: [
        {
          id: 'obj-k1-09-01',
          description: '封印の呪文のふういんを解こう',
          checks: [{ type: 'command_executed', command: 'chmod' }],
          hints: [
            { level: 1, text: 'ファイルのけんげん（つかえるかどうか）をかえるコマンドがあるよ。' },
            { level: 2, text: '「chmod」コマンドで「+x」をつけると、実行できるようになるよ。' },
            { level: 3, text: '「chmod +x 封印の呪文.sh」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-09-02',
          description: '魔法の石から「光」の魔法をさがそう',
          checks: [{ type: 'output_contains', pattern: '光の魔法' }],
          hints: [
            { level: 1, text: 'パイプ「|」をつかって、コマンドをつなげてみよう。' },
            { level: 2, text: '「cat」でファイルを読んで、「|」で「grep」につなげると、ほしい行だけとりだせるよ。' },
            { level: 3, text: '「cat 魔法の石.txt | grep 光」とにゅうりょくしてね。' },
          ],
        },
      ],
    },
    // ミッション10: 冒険の記録をつけよう
    {
      id: 'mission-k1-10',
      title: '冒険の記録をつけよう',
      description:
        'gitをつかって、冒険のきろくをかくにんしよう！',
      narrative:
        '秘密基地にもどってきた。冒険のきろくがgitでのこしてある。いままでの冒険をふりかえってみよう！',
      initialCwd: '/冒険の世界/秘密基地',
      initialFS: mission10FS,
      newCommands: ['git'],
      objectives: [
        {
          id: 'obj-k1-10-01',
          description: 'いまのじょうたいをかくにんしよう',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'modified' },
          ],
          hints: [
            { level: 1, text: 'gitのじょうたいをかくにんするコマンドがあるよ。' },
            { level: 2, text: '「git status」でいまのじょうたいがわかるよ。' },
            { level: 3, text: '「git status」とにゅうりょくしてね。' },
          ],
        },
        {
          id: 'obj-k1-10-02',
          description: 'いままでの冒険のきろくを見よう',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'commit' },
          ],
          hints: [
            { level: 1, text: 'きろく（ログ）を見るgitコマンドがあるよ。' },
            { level: 2, text: '「git log」でいままでのきろくが見られるよ。' },
            { level: 3, text: '「git log」とにゅうりょくしてね。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: [],
};
