import type { Story, FSNode } from '../types.js';

// ミッション1: 冒険のはじまり
const mission1FS: FSNode = {
  type: 'directory',
  children: {
    world: {
      type: 'directory',
      children: {
        start: {
          type: 'directory',
          children: {
            'sign.txt': {
              type: 'file',
              content:
                'ようこそ、冒険の世界へ！\nここからきみの冒険がはじまるよ。\nまずは、いまいる場所をたしかめてみよう！\n',
            },
          },
        },
        forest: {
          type: 'directory',
          children: {},
        },
        castle: {
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
    world: {
      type: 'directory',
      children: {
        start: {
          type: 'directory',
          children: {
            'sign.txt': {
              type: 'file',
              content:
                'ようこそ、冒険の世界へ！\nここからきみの冒険がはじまるよ。\nまずは、いまいる場所をたしかめてみよう！\n',
            },
          },
        },
        forest: {
          type: 'directory',
          children: {
            'flower.txt': {
              type: 'file',
              content: 'きれいに光る花だ。さわるとあたたかい。\n',
            },
            'scroll.txt': {
              type: 'file',
              content:
                'この巻物には古い言い伝えが書いてある。\n『北の洞窟に宝が眠る』\n',
            },
            'hint.txt': {
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
    world: {
      type: 'directory',
      children: {
        start: {
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
    world: {
      type: 'directory',
      children: {
        forest: {
          type: 'directory',
          children: {
            'gem.txt': {
              type: 'file',
              content: 'キラキラ光る美しい宝石だ。\n',
            },
          },
        },
        castle: {
          type: 'directory',
          children: {
            treasure: {
              type: 'directory',
              children: {
                'sword.txt': {
                  type: 'file',
                  content: '古代の勇者が使っていた伝説の剣だ。\n',
                },
              },
            },
          },
        },
        base: {
          type: 'directory',
          children: {
            treasure: {
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
    world: {
      type: 'directory',
      children: {
        cave: {
          type: 'directory',
          children: {
            'trap1.txt': {
              type: 'file',
              content: '⚠ これはトラップだ！さわると大変！\n',
            },
            'trap2.txt': {
              type: 'file',
              content: '⚠ これはトラップだ！さわると大変！\n',
            },
            'map.txt': {
              type: 'file',
              content: '宝はこの洞窟の奥にあるらしい。\n',
            },
            'back-room': {
              type: 'directory',
              children: {
                'trap3.txt': {
                  type: 'file',
                  content: '⚠ これはトラップだ！さわると大変！\n',
                },
                'chest.txt': {
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
    world: {
      type: 'directory',
      children: {
        cave: {
          type: 'directory',
          children: {
            'cipher.txt': {
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
    world: {
      type: 'directory',
      children: {
        castle: {
          type: 'directory',
          children: {
            library: {
              type: 'directory',
              children: {
                'spellbook.txt': {
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
    world: {
      type: 'directory',
      children: {
        castle: {
          type: 'directory',
          children: {
            'party.csv': {
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
    world: {
      type: 'directory',
      children: {
        castle: {
          type: 'directory',
          children: {
            'seal.sh': {
              type: 'file',
              content: '#!/bin/bash\necho "封印が解けた！大きな扉が開く！"\n',
              permissions: '-rw-r--r--',
            },
            'stone.txt': {
              type: 'file',
              content:
                '火の魔法\n水の魔法\n風の魔法\n土の魔法\n光の魔法\n闇の魔法\n',
            },
            'wand.txt': {
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
  '\tmodified:   diary.txt',
  '',
  'no changes added to commit (use "git add" to track)',
].join('\n');

const mission10FS: FSNode = {
  type: 'directory',
  children: {
    world: {
      type: 'directory',
      children: {
        base: {
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
                  content: 'main',
                },
                log: {
                  type: 'file',
                  content: gitLogContent,
                },
                status: {
                  type: 'file',
                  content: gitStatusOutput,
                },
              },
            },
            'diary.txt': {
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
      goal: 'pwd と ls をつかって、いまいる場所とまわりにあるものがわかるようになる',
      review: {
        question: 'いまいるばしょをひょうじするコマンドはどれかな？',
        choices: ['ls', 'cd', 'pwd'],
        correctIndex: 2,
        explanation: 'pwd はいまいるばしょ（ディレクトリ）をひょうじするコマンドだよ。「Print Working Directory」のりゃくだよ。',
      },
      narrative:
        'きみは冒険の世界（world）にやってきた！start（スタート地点）にいるみたいだけど、ここはどこだろう？まずは「いまいる場所」をたしかめて、まわりに何があるか見てみよう。',
      initialCwd: '/world/start',
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
          feedbacks: [
            { pattern: 'ls', message: 'ls はまわりを見るコマンドだよ。いまいる場所をしるには、べつのコマンドをつかうよ。' },
            { pattern: 'cd', message: 'cd はべつの場所にいどうするコマンドだよ。いまいる場所をたしかめるには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。いまいる場所をしるには、べつのコマンドをつかうよ。' },
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
          feedbacks: [
            { pattern: 'pwd', message: 'pwd はいまいる場所をひょうじするコマンドだよ。まわりを見るには、べつのコマンドをつかうよ。' },
            { pattern: 'cd', message: 'cd はべつの場所にいどうするコマンドだよ。まわりにあるものを見るには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。まわりにあるものを見るには、べつのコマンドをつかうよ。' },
          ],
        },
      ],
    },
    // ミッション2: 森を冒険しよう
    {
      id: 'mission-k1-02',
      title: '森を冒険しよう',
      description:
        'forest（もり）にいって、scroll.txt（巻物）を読んでみよう！',
      goal: 'cd でべつの場所にいどうし、cat でファイルを読めるようになる',
      review: {
        question: 'べつのばしょにいどうするコマンドはどれかな？',
        choices: ['pwd', 'ls', 'cd', 'cat'],
        correctIndex: 2,
        explanation: 'cd はべつのばしょ（ディレクトリ）にいどうするコマンドだよ。「Change Directory」のりゃくだよ。',
      },
      narrative:
        '案内板（sign.txt）に「森（forest）には何かひみつがある」と書いてあった。forest にいって、手がかりをさがそう！巻物を読んだら、start（スタート地点）にもどってこよう。',
      initialCwd: '/world/start',
      initialFS: mission2FS,
      newCommands: ['cd', 'cat'],
      objectives: [
        {
          id: 'obj-k1-02-01',
          description: 'forest（もり）にいどうしよう',
          checks: [{ type: 'cwd_equals', path: '/world/forest' }],
          hints: [
            { level: 1, text: 'べつの場所にいどうするコマンドがあるよ。' },
            { level: 2, text: '「cd」のあとに、いきたい場所の名前を書くよ。' },
            { level: 3, text: '「cd /world/forest」とにゅうりょくしてね。forest はもりのことだよ。' },
          ],
          feedbacks: [
            { pattern: 'pwd', message: 'pwd はいまいる場所をたしかめるコマンドだよ。べつの場所にいくには、いどうするコマンドをつかうよ。' },
            { pattern: 'ls', message: 'ls はまわりにあるものを見るコマンドだよ。べつの場所にいくには、いどうするコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。べつの場所にいくには、いどうするコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-02-02',
          description: 'scroll.txt（巻物）を読んでみよう',
          checks: [
            { type: 'command_executed', command: 'cat' },
            { type: 'output_contains', pattern: '宝' },
          ],
          hints: [
            { level: 1, text: 'ファイルの中身を読むコマンドがあるよ。' },
            { level: 2, text: '「cat」のあとにファイル名を書くと、中身が読めるよ。' },
            { level: 3, text: '「cat scroll.txt」とにゅうりょくしてね。scroll は巻物のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'pwd', message: 'pwd はいまいる場所をたしかめるコマンドだよ。ファイルの中身を読むには、べつのコマンドをつかうよ。' },
            { pattern: 'ls', message: 'ls はまわりにあるものを見るコマンドだよ。ファイルの中身を読むには、べつのコマンドをつかうよ。' },
            { pattern: 'cd', message: 'cd はべつの場所にいどうするコマンドだよ。ファイルの中身を読むには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-02-03',
          description: 'start（スタート地点）にもどろう',
          checks: [{ type: 'cwd_equals', path: '/world/start' }],
          hints: [
            { level: 1, text: 'さっきつかった「cd」コマンドでもどれるよ。' },
            { level: 2, text: 'start のフルパスを指定しよう。' },
            { level: 3, text: '「cd /world/start」とにゅうりょくしてね。start はスタート地点のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'pwd', message: 'pwd はいまいる場所をたしかめるコマンドだよ。もどるには、いどうするコマンドをつかうよ。' },
            { pattern: 'ls', message: 'ls はまわりにあるものを見るコマンドだよ。もどるには、いどうするコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。もどるには、いどうするコマンドをつかうよ。' },
          ],
        },
      ],
    },
    // ミッション3: 秘密基地を作ろう
    {
      id: 'mission-k1-03',
      title: '秘密基地を作ろう',
      description:
        'じぶんだけの秘密基地（base）をつくろう！部屋もつくって、ノートもおこう。',
      goal: 'mkdir でフォルダをつくり、touch でファイルをつくれるようになる',
      review: {
        question: 'あたらしいフォルダをつくるコマンドはどれかな？',
        choices: ['touch', 'mkdir', 'rm', 'ls'],
        correctIndex: 1,
        explanation: 'mkdir はあたらしいフォルダ（ディレクトリ）をつくるコマンドだよ。「Make Directory」のりゃくだよ。',
      },
      narrative:
        '冒険には秘密基地がひつようだ！まずは base（秘密基地）をつくって、たからものをしまう treasure（宝物庫）と、冒険のきろくをつける note.txt（冒険ノート）を用意しよう。',
      initialCwd: '/world',
      initialFS: mission3FS,
      newCommands: ['mkdir', 'touch'],
      objectives: [
        {
          id: 'obj-k1-03-01',
          description: 'base（秘密基地）をつくろう',
          checks: [{ type: 'file_exists', path: '/world/base' }],
          hints: [
            { level: 1, text: 'あたらしいフォルダをつくるコマンドがあるよ。' },
            { level: 2, text: '「mkdir」のあとにフォルダの名前を書くよ。' },
            { level: 3, text: '「mkdir base」とにゅうりょくしてね。base は秘密基地のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'touch', message: 'touch はからっぽのファイルをつくるコマンドだよ。フォルダをつくるには、べつのコマンドをつかうよ。' },
            { pattern: 'ls', message: 'ls はまわりにあるものを見るコマンドだよ。あたらしいフォルダをつくるには、べつのコマンドをつかうよ。' },
            { pattern: 'cd', message: 'cd はべつの場所にいどうするコマンドだよ。あたらしいフォルダをつくるには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-03-02',
          description: 'base の中に treasure（宝物庫）をつくろう',
          checks: [{ type: 'file_exists', path: '/world/base/treasure' }],
          hints: [
            { level: 1, text: '秘密基地の中にもうひとつフォルダをつくろう。' },
            { level: 2, text: '「mkdir」でパスを指定して、中にフォルダがつくれるよ。' },
            { level: 3, text: '「mkdir base/treasure」とにゅうりょくしてね。treasure は宝物庫のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'touch', message: 'touch はファイルをつくるコマンドだよ。フォルダをつくるには、さっきとおなじコマンドをつかうよ。' },
            { pattern: 'cd', message: 'cd はいどうするコマンドだよ。フォルダをつくるには、さっきつかったコマンドをもういちどつかおう。' },
          ],
        },
        {
          id: 'obj-k1-03-03',
          description: 'note.txt（冒険ノート）をつくろう',
          checks: [
            { type: 'file_exists', path: '/world/base/note.txt' },
          ],
          hints: [
            { level: 1, text: 'からっぽのファイルをつくるコマンドがあるよ。' },
            { level: 2, text: '「touch」のあとにファイル名を書くと、ファイルがつくれるよ。' },
            { level: 3, text: '「touch base/note.txt」とにゅうりょくしてね。note は冒険ノートのことだよ。' },
          ],
          feedbacks: [
            { pattern: 'mkdir', message: 'mkdir はフォルダをつくるコマンドだよ。からっぽのファイルをつくるには、べつのコマンドをつかうよ。' },
            { pattern: 'echo', message: 'echo はもじをひょうじするコマンドだよ。からっぽのファイルをつくるには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。からっぽのファイルをつくるには、べつのコマンドをつかうよ。' },
          ],
        },
      ],
    },
    // ミッション4: 宝物を集めよう
    {
      id: 'mission-k1-04',
      title: '宝物を集めよう',
      description:
        'いろんな場所にある宝物を base（秘密基地）の treasure（宝物庫）にあつめよう！',
      goal: 'cp でコピー、mv でいどうができるようになる',
      review: {
        question: 'ファイルをコピーするコマンドはどれかな？',
        choices: ['mv', 'cp', 'rm', 'cat'],
        correctIndex: 1,
        explanation: 'cp はファイルをコピーするコマンドだよ。もとのファイルはそのままのこるよ。「copy」のりゃくだよ。',
      },
      narrative:
        '冒険の世界にはたからものがいっぱい！forest（もり）にある gem.txt（宝石）をコピーして、castle（お城）にある sword.txt（伝説の剣）を base/treasure（秘密基地の宝物庫）にうつそう。',
      initialCwd: '/world',
      initialFS: mission4FS,
      newCommands: ['cp', 'mv'],
      objectives: [
        {
          id: 'obj-k1-04-01',
          description: 'gem.txt（宝石）を base/treasure（宝物庫）にコピーしよう',
          checks: [
            {
              type: 'file_exists',
              path: '/world/base/treasure/gem.txt',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをコピーするコマンドがあるよ。' },
            { level: 2, text: '「cp」のあとに「もとのファイル」「コピーさき」を書くよ。もとのファイルは「forest/gem.txt」で、コピーさきは「base/treasure/」だよ。' },
            {
              level: 3,
              text: '「cp forest/gem.txt base/treasure/gem.txt」とにゅうりょくしてね。gem は宝石のことだよ。',
            },
          ],
          feedbacks: [
            { pattern: 'mv', message: 'mv はファイルをいどうするコマンドだよ。コピーするには、もとのファイルをのこしたままつくるコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。ファイルをコピーするには、べつのコマンドをつかうよ。' },
            { pattern: 'rm', message: 'rm はファイルをけすコマンドだよ。コピーするには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-04-02',
          description: 'sword.txt（伝説の剣）を base/treasure（宝物庫）にうつそう',
          checks: [
            {
              type: 'file_exists',
              path: '/world/base/treasure/sword.txt',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをべつの場所にうつすコマンドがあるよ。' },
            { level: 2, text: '「mv」のあとに「もとのファイル」「うつしさき」を書くよ。コピーとちがって、もとのファイルはなくなるよ。' },
            {
              level: 3,
              text: '「mv castle/treasure/sword.txt base/treasure/sword.txt」とにゅうりょくしてね。sword は剣のことだよ。',
            },
          ],
          feedbacks: [
            { pattern: 'cp', message: 'cp はコピーするコマンドだよ。もとのファイルをなくして、べつの場所にうつすには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。ファイルをうつすには、べつのコマンドをつかうよ。' },
            { pattern: 'rm', message: 'rm はファイルをけすコマンドだよ。うつすには、けすのではなくいどうするコマンドをつかうよ。' },
          ],
        },
      ],
    },
    // ミッション5: トラップを片付けよう
    {
      id: 'mission-k1-05',
      title: 'トラップを片付けよう',
      description:
        'cave（ひみつの洞窟）にしかけられたトラップを見つけて、かたづけよう！',
      goal: 'find でファイルをさがし、rm でけせるようになる',
      review: {
        question: 'ファイルをけすコマンドはどれかな？',
        choices: ['cp', 'mv', 'rm', 'find'],
        correctIndex: 2,
        explanation: 'rm はファイルをけすコマンドだよ。「remove」のりゃくだよ。けしたファイルはもとにもどせないから、きをつけてつかおうね。',
      },
      narrative:
        'cave（ひみつの洞窟）にはトラップがしかけてある！まずはトラップがどこにあるか見つけて、ぜんぶかたづけよう。そうすれば安全にたからものがとれるよ。',
      initialCwd: '/world/cave',
      initialFS: mission5FS,
      newCommands: ['rm', 'find'],
      objectives: [
        {
          id: 'obj-k1-05-01',
          description: 'find コマンドでトラップをさがそう',
          checks: [
            { type: 'command_executed', command: 'find' },
            { type: 'output_contains', pattern: 'trap' },
          ],
          hints: [
            { level: 1, text: 'ファイルをさがすコマンドがあるよ。' },
            { level: 2, text: '「find」コマンドで名前をしていしてさがせるよ。-name のあとにさがしたい名前を書くよ。' },
            {
              level: 3,
              text: '「find . -name trap*」とにゅうりょくしてね。trap はトラップのことだよ。* は「なんでもOK」というマークで、trap ではじまるファイルをぜんぶさがすよ。',
            },
          ],
          feedbacks: [
            { pattern: 'ls', message: 'ls はいまいるフォルダの中身を見るコマンドだよ。おくのフォルダもふくめてさがすには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。ファイルをさがすには、べつのコマンドをつかうよ。' },
            { pattern: 'grep', message: 'grep はファイルの中のことばをさがすコマンドだよ。ファイルの名前でさがすには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-05-02',
          description: 'trap1.txt（トラップ1）をけそう',
          checks: [
            {
              type: 'file_not_exists',
              path: '/world/cave/trap1.txt',
            },
          ],
          hints: [
            { level: 1, text: 'ファイルをけすコマンドがあるよ。' },
            { level: 2, text: '「rm」のあとにけしたいファイル名を書くよ。' },
            { level: 3, text: '「rm trap1.txt」とにゅうりょくしてね。trap はトラップのことだよ。' },
          ],
          feedbacks: [
            { pattern: 'mv', message: 'mv はファイルをいどうするコマンドだよ。ファイルをけすには、べつのコマンドをつかうよ。' },
            { pattern: 'find', message: 'find はファイルをさがすコマンドだよ。もうみつけたから、つぎはけすコマンドをつかおう。' },
          ],
        },
        {
          id: 'obj-k1-05-03',
          description: 'trap2.txt（トラップ2）をけそう',
          checks: [
            {
              type: 'file_not_exists',
              path: '/world/cave/trap2.txt',
            },
          ],
          hints: [
            { level: 1, text: 'さっきとおなじようにけしてみよう。' },
            { level: 2, text: '「rm」コマンドをつかおう。' },
            { level: 3, text: '「rm trap2.txt」とにゅうりょくしてね。' },
          ],
          feedbacks: [
            { pattern: 'mv', message: 'mv はいどうするコマンドだよ。けすには、さっきとおなじコマンドをつかおう。' },
          ],
        },
        {
          id: 'obj-k1-05-04',
          description: 'back-room（奥の部屋）の trap3.txt もけそう',
          checks: [
            {
              type: 'file_not_exists',
              path: '/world/cave/back-room/trap3.txt',
            },
          ],
          hints: [
            { level: 1, text: '奥の部屋（back-room）の中にあるファイルもけせるよ。' },
            { level: 2, text: 'パスを指定すればべつのフォルダの中のファイルもけせるよ。' },
            { level: 3, text: '「rm back-room/trap3.txt」とにゅうりょくしてね。back-room は奥の部屋のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cd', message: 'cd でいどうしなくても、パスをしていすればべつのフォルダの中のファイルもけせるよ。' },
          ],
        },
      ],
    },
    // ミッション6: 暗号を解読しよう
    {
      id: 'mission-k1-06',
      title: '暗号を解読しよう',
      description:
        'cipher.txt（暗号文）から手がかりをさがして、けっかを書きのこそう！',
      goal: 'grep でことばをさがし、echo でファイルに書きこめるようになる',
      review: {
        question: 'ファイルの中からことばをさがすコマンドはどれかな？',
        choices: ['find', 'cat', 'grep', 'echo'],
        correctIndex: 2,
        explanation: 'grep はファイルの中からことばをさがすコマンドだよ。find がファイルの「名前」をさがすのにたいして、grep はファイルの「中身」をさがすよ。',
      },
      narrative:
        '洞窟のおくで cipher.txt（暗号文）を見つけた！この中に「魔法」というキーワードがかくれているらしい。さがしだして、わかったことを decoded.txt（解読結果）に書きのこそう。',
      initialCwd: '/world/cave',
      initialFS: mission6FS,
      newCommands: ['grep', 'echo'],
      objectives: [
        {
          id: 'obj-k1-06-01',
          description: 'cipher.txt（暗号文）から「魔法」という言葉をさがそう',
          checks: [
            { type: 'command_executed', command: 'grep' },
            { type: 'output_contains', pattern: '魔法' },
          ],
          hints: [
            { level: 1, text: 'ファイルの中からことばをさがすコマンドがあるよ。' },
            { level: 2, text: '「grep」のあとにさがしたいことばとファイル名を書くよ。' },
            { level: 3, text: '「grep 魔法 cipher.txt」とにゅうりょくしてね。cipher は暗号文のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルのぜんぶを読むコマンドだよ。とくていのことばだけさがすには、べつのコマンドをつかうよ。' },
            { pattern: 'find', message: 'find はファイルの名前をさがすコマンドだよ。ファイルの中身からことばをさがすには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-06-02',
          description: 'grep で見つけた内容を echo と > で decoded.txt に書こう',
          checks: [
            {
              type: 'file_exists',
              path: '/world/cave/decoded.txt',
            },
          ],
          hints: [
            { level: 1, text: 'もじをファイルに書きこむコマンドがあるよ。' },
            { level: 2, text: '「echo」のあとに書きたいもじを「"」で囲んで、「>」のあとにファイル名を書くよ。「>」は「ファイルに書きこむ」というマークだよ。' },
            {
              level: 3,
              text: '「echo "魔法使いが宝の地図をくれた" > decoded.txt」とにゅうりょくしてね。decoded は解読結果のことだよ。',
            },
          ],
          feedbacks: [
            { pattern: 'touch', message: 'touch はからっぽのファイルをつくるコマンドだよ。中身もいっしょに書きこむには、べつのコマンドと「>」をつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルを読むコマンドだよ。ファイルに書きこむには、べつのコマンドと「>」をつかうよ。' },
          ],
        },
      ],
    },
    // ミッション7: 古い書物を読もう
    {
      id: 'mission-k1-07',
      title: '古い書物を読もう',
      description:
        'ながい spellbook.txt（魔法の書）の最初と最後をかくにんして、何ページあるかかぞえよう！',
      goal: 'head と tail でファイルの一部を読み、wc で行数をかぞえられるようになる',
      review: {
        question: 'ファイルのさいしょの方だけ読むコマンドはどれかな？',
        choices: ['cat', 'head', 'tail', 'wc'],
        correctIndex: 1,
        explanation: 'head はファイルのさいしょの方だけひょうじするコマンドだよ。さいごの方を見るには tail をつかうよ。',
      },
      narrative:
        'castle（古いお城）の library（図書室）で、ぶあつい spellbook.txt（魔法の書）を見つけた！ぜんぶ読むのは大変だから、最初と最後だけ読んで、ページ数もかくにんしよう。',
      initialCwd: '/world/castle/library',
      initialFS: mission7FS,
      newCommands: ['head', 'tail', 'wc'],
      objectives: [
        {
          id: 'obj-k1-07-01',
          description: 'spellbook.txt（魔法の書）のさいしょの部分を読もう',
          checks: [{ type: 'command_executed', command: 'head' }],
          hints: [
            { level: 1, text: 'ファイルのさいしょだけ読むコマンドがあるよ。' },
            { level: 2, text: '「head」コマンドをつかうと、ファイルのさいしょの方だけ見られるよ。' },
            { level: 3, text: '「head spellbook.txt」とにゅうりょくしてね。spellbook は魔法の書のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルのぜんぶをひょうじするよ。さいしょの方だけ見るには、べつのコマンドをつかうよ。' },
            { pattern: 'tail', message: 'tail はファイルのさいごの方をひょうじするコマンドだよ。さいしょの方を見るには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-07-02',
          description: 'spellbook.txt（魔法の書）のさいごの部分を読もう',
          checks: [{ type: 'command_executed', command: 'tail' }],
          hints: [
            { level: 1, text: 'ファイルのさいごだけ読むコマンドがあるよ。' },
            { level: 2, text: '「tail」コマンドをつかうと、ファイルのさいごの方だけ見られるよ。' },
            { level: 3, text: '「tail spellbook.txt」とにゅうりょくしてね。spellbook は魔法の書のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルのぜんぶをひょうじするよ。さいごの方だけ見るには、べつのコマンドをつかうよ。' },
            { pattern: 'head', message: 'head はファイルのさいしょの方をひょうじするコマンドだよ。さいごの方を見るには、べつのコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-07-03',
          description: 'spellbook.txt（魔法の書）が何行あるかかぞえよう',
          checks: [
            { type: 'command_executed', command: 'wc' },
            { type: 'output_contains', pattern: '21' },
          ],
          hints: [
            { level: 1, text: 'ファイルの行数をかぞえるコマンドがあるよ。' },
            { level: 2, text: '「wc」コマンドをつかうと、行の数がわかるよ。' },
            { level: 3, text: '「wc spellbook.txt」とにゅうりょくしてね。spellbook は魔法の書のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルの中身をひょうじするよ。行の数をかぞえるには、べつのコマンドをつかうよ。' },
            { pattern: 'head', message: 'head はファイルのさいしょの方をひょうじするよ。行数をかぞえるには、べつのコマンドをつかうよ。' },
            { pattern: 'tail', message: 'tail はファイルのさいごの方をひょうじするよ。行数をかぞえるには、べつのコマンドをつかうよ。' },
          ],
        },
      ],
    },
    // ミッション8: 仲間リストを整理しよう
    {
      id: 'mission-k1-08',
      title: '仲間リストを整理しよう',
      description:
        'party.csv（冒険者の名簿）をきれいに整理しよう！',
      goal: 'sort、uniq、cut をつかってデータを整理できるようになる',
      review: {
        question: 'おなじ行をまとめてくれるコマンドはどれかな？',
        choices: ['sort', 'uniq', 'cut', 'grep'],
        correctIndex: 1,
        explanation: 'uniq はとなりあうおなじ行をまとめるコマンドだよ。sort でならべてから uniq をつかうと、ぜんぶのおなじ行をまとめられるよ。',
      },
      narrative:
        'castle（古いお城）で party.csv（冒険者の名簿）を見つけた。でも同じ名前が何回も書いてある。きれいに整理して、どんな職業の仲間がいるか調べよう。',
      initialCwd: '/world/castle',
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
            { level: 3, text: '「sort party.csv」とにゅうりょくしてね。party は冒険者名簿のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルをそのままひょうじするよ。じゅんばんにならべるには、べつのコマンドをつかうよ。' },
            { pattern: 'uniq', message: 'uniq はおなじ行をまとめるコマンドだよ。まずはじゅんばんにならべるコマンドをつかおう。' },
          ],
        },
        {
          id: 'obj-k1-08-02',
          description: 'おなじ行をまとめよう',
          checks: [{ type: 'command_executed', command: 'uniq' }],
          hints: [
            { level: 1, text: 'おなじものをまとめるコマンドがあるよ。パイプ「|」もつかってみよう。' },
            { level: 2, text: '「sort」したあとに「|」（パイプ）で「uniq」につなげると、おなじ行をまとめられるよ。「|」は「けっかをつぎのコマンドにわたす」マークだよ。' },
            { level: 3, text: '「sort party.csv | uniq」とにゅうりょくしてね。' },
          ],
          feedbacks: [
            { pattern: 'grep', message: 'grep はことばをさがすコマンドだよ。おなじ行をまとめるには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルをそのままひょうじするよ。おなじ行をまとめるには、sort と パイプ「|」をつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-08-03',
          description: '名簿の2番目（職業）だけをとりだそう',
          checks: [
            { type: 'command_executed', command: 'cut' },
            { type: 'output_contains', pattern: '職業' },
          ],
          hints: [
            { level: 1, text: 'とくていの部分だけきりだすコマンドがあるよ。' },
            { level: 2, text: '「cut」コマンドで「,」でくぎって2ばんめの部分をとりだせるよ。' },
            {
              level: 3,
              text: '「cut -d, -f2 party.csv」とにゅうりょくしてね。party は冒険者名簿のことだよ。',
            },
          ],
          feedbacks: [
            { pattern: 'grep', message: 'grep はことばをさがすコマンドだよ。とくていの部分だけきりだすには、べつのコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルのぜんぶをひょうじするよ。とくていの部分だけきりだすには、べつのコマンドをつかうよ。' },
          ],
        },
      ],
    },
    // ミッション9: 封印を解こう
    {
      id: 'mission-k1-09',
      title: '封印を解こう',
      description:
        'seal.sh に「じっこうしてもいいよ」のきょかを出して、魔法の石から「光」をさがそう！',
      goal: 'chmod でけんげんをかえ、パイプで grep をつなげられるようになる',
      review: {
        question: 'ファイルのけんげん（つかえるかどうか）をかえるコマンドはどれかな？',
        choices: ['chown', 'chmod', 'mv', 'cp'],
        correctIndex: 1,
        explanation: 'chmod はファイルのけんげん（パーミッション）をかえるコマンドだよ。「change mode」のりゃくだよ。',
      },
      narrative:
        'castle（古いお城）のおくで、seal.sh（封印の呪文）を見つけた！でも今はロックされていて動かせない。chmod コマンドで「じっこうOK」にしてあげよう。それから stone.txt（魔法の石）にはたくさんの魔法が書いてあるよ。grep コマンドで「光」の魔法だけをとりだそう！',
      initialCwd: '/world/castle',
      initialFS: mission9FS,
      newCommands: ['chmod'],
      objectives: [
        {
          id: 'obj-k1-09-01',
          description: 'chmod をつかって seal.sh を「じっこうOK」にしよう',
          checks: [{ type: 'command_executed', command: 'chmod' }],
          hints: [
            { level: 1, text: 'ファイルのけんげん（つかえるかどうか）をかえるコマンドがあるよ。' },
            { level: 2, text: '「chmod」コマンドで「+x」をつけると、実行できるようになるよ。' },
            { level: 3, text: '「chmod +x seal.sh」とにゅうりょくしてね。seal は封印の呪文のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。ふういんを解く（けんげんをかえる）には、べつのコマンドをつかうよ。' },
            { pattern: 'rm', message: 'rm はファイルをけすコマンドだよ。ふういんを解くには、けんげんをかえるコマンドをつかおう。' },
          ],
        },
        {
          id: 'obj-k1-09-02',
          description: 'grep をつかって stone.txt から「光」の行だけとりだそう',
          checks: [
            { type: 'command_executed', command: 'grep' },
            { type: 'output_contains', pattern: '光の魔法' },
          ],
          hints: [
            { level: 1, text: 'パイプ「|」をつかって、コマンドをつなげてみよう。' },
            { level: 2, text: '「cat」でファイルを読んで、「|」で「grep」につなげると、ほしい行だけとりだせるよ。' },
            { level: 3, text: '「cat stone.txt | grep 光」とにゅうりょくしてね。stone は魔法の石のことだよ。' },
          ],
          feedbacks: [
            { pattern: 'find', message: 'find はファイルの名前をさがすコマンドだよ。ファイルの中身からさがすには、grep をつかうよ。パイプ「|」でつなげてみよう。' },
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
      goal: 'git status と git log で変更のきろくをかくにんできるようになる',
      review: {
        question: 'いままでのきろく（ログ）を見るgitコマンドはどれかな？',
        choices: ['git status', 'git log', 'git add', 'git diff'],
        correctIndex: 1,
        explanation: 'git log はいままでのへんこうのきろく（コミット）をひょうじするコマンドだよ。git status はいまのじょうたいをたしかめるコマンドだよ。',
      },
      narrative:
        'base（秘密基地）にもどってきた。冒険のきろくがgitでのこしてある。いままでの冒険をふりかえってみよう！',
      initialCwd: '/world/base',
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
          feedbacks: [
            { pattern: 'ls', message: 'ls はフォルダの中身を見るコマンドだよ。gitのじょうたいを見るには、git のコマンドをつかうよ。' },
            { pattern: 'cat', message: 'cat はファイルを読むコマンドだよ。gitのじょうたいをかくにんするには、git のコマンドをつかうよ。' },
          ],
        },
        {
          id: 'obj-k1-10-02',
          description: 'いままでの冒険のきろくを見よう',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'Author:' },
          ],
          hints: [
            { level: 1, text: 'きろく（ログ）を見るgitコマンドがあるよ。' },
            { level: 2, text: '「git log」でいままでのきろくが見られるよ。' },
            { level: 3, text: '「git log」とにゅうりょくしてね。' },
          ],
          feedbacks: [
            { pattern: 'cat', message: 'cat はファイルの中身を読むコマンドだよ。gitのきろくを見るには、git のコマンドをつかうよ。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: [],
};
