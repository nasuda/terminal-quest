import type { Story, FSNode } from '../types.js';

// ミッション1: ここはどこ？
const mission1FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'photos': {
              type: 'directory',
              children: {},
            },
            'music': {
              type: 'directory',
              children: {},
            },
            'memo': {
              type: 'directory',
              children: {},
            },
            'welcome.txt': {
              type: 'file',
              content: 'はじめまして！これはあなたの新しいパソコンです。\nまずは、今いる場所を確認してみましょう。\n',
            },
          },
        },
      },
    },
  },
};

// ミッション2: フォルダの中を見て回ろう
const mission2FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'photos': {
              type: 'directory',
              children: {
                'travel-photo.txt': {
                  type: 'file',
                  content: '海辺で撮った写真です。とてもきれいでした。\n',
                },
              },
            },
            'music': {
              type: 'directory',
              children: {
                'favorites.txt': {
                  type: 'file',
                  content: '1. 夏の思い出\n2. 星空のメロディー\n3. 雨の日の歌\n',
                },
                'playlist': {
                  type: 'directory',
                  children: {
                    'driving.txt': {
                      type: 'file',
                      content: 'アップテンポな曲を集めました！\n',
                    },
                  },
                },
              },
            },
            'recipes': {
              type: 'directory',
              children: {
                'curry.txt': {
                  type: 'file',
                  content: '材料: じゃがいも、にんじん、たまねぎ、お肉\n作り方: 野菜を切って煮込む\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション3: 写真アルバムを作ろう
const mission3FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'photos': {
              type: 'directory',
              children: {
                'sea.txt': {
                  type: 'file',
                  content: '青い海と白い砂浜の写真です。\n',
                },
                'mountain.txt': {
                  type: 'file',
                  content: '紅葉がきれいな山の写真です。\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション4: ファイルを整理しよう
const mission4FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'photos': {
              type: 'directory',
              children: {
                'travel': {
                  type: 'directory',
                  children: {},
                },
                'pets': {
                  type: 'directory',
                  children: {},
                },
              },
            },
            'memo': {
              type: 'directory',
              children: {
                'shopping.txt': {
                  type: 'file',
                  content: '牛乳、パン、たまご\n',
                },
              },
            },
            'important.txt': {
              type: 'file',
              content: '明日の会議は10時から。\n',
            },
          },
        },
      },
    },
  },
};

// ミッション5: いらないファイルを片付けよう
const mission5FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'memo': {
              type: 'directory',
              children: {
                'shopping.txt': {
                  type: 'file',
                  content: '牛乳、パン、たまご\n',
                },
                'todo.txt': {
                  type: 'file',
                  content: '1. 掃除\n2. 買い物\n3. 料理\n',
                },
                'old-memo.tmp': {
                  type: 'file',
                  content: '一時ファイルです。\n',
                },
              },
            },
            'photos': {
              type: 'directory',
              children: {
                'travel': {
                  type: 'directory',
                  children: {
                    'memories.txt': {
                      type: 'file',
                      content: '楽しい旅行の思い出です。\n',
                    },
                  },
                },
                'junk.tmp': {
                  type: 'file',
                  content: '不要な一時ファイルです。\n',
                },
              },
            },
            'recipes': {
              type: 'directory',
              children: {
                'curry.txt': {
                  type: 'file',
                  content: '材料: じゃがいも、にんじん、たまねぎ、お肉\n作り方: 野菜を切って煮込む\n',
                },
                'temp.tmp': {
                  type: 'file',
                  content: '不要な一時ファイルです。\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション6: 日記を書こう
const mission6FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'diary': {
              type: 'directory',
              children: {
                '2024-01-15.txt': {
                  type: 'file',
                  content: '今日は天気がよかった。公園で散歩をした。\n桜がきれいに咲いていた。\n',
                },
                '2024-01-16.txt': {
                  type: 'file',
                  content: '今日は雨だった。家で本を読んだ。\n夕方に虹が見えた。\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション7: 長いレポートを確認しよう
const reportContent = [
  '旅行報告書',
  '',
  '日程: 2024年1月10日〜1月14日',
  '目的地: 北海道',
  '',
  '1日目:',
  '新千歳空港に到着。レンタカーを借りて札幌へ。',
  '札幌ラーメンを食べた。とてもおいしかった。',
  '',
  '2日目:',
  '小樽運河を観光した。ガラス細工のお店を見て回った。',
  'お寿司がとても新鮮でおいしかった。',
  '',
  '3日目:',
  '富良野に移動。ラベンダー畑がきれいだった。',
  'ファーム富田でソフトクリームを食べた。',
  '',
  '4日目:',
  '旭山動物園に行った。ペンギンの散歩が見られた。',
  'お土産をたくさん買った。',
  '',
  '5日目:',
  '新千歳空港でお土産を追加購入。白い恋人を買った。',
  '飛行機で帰宅。とても楽しい旅行だった。',
].join('\n');

const mission7FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'report.txt': {
              type: 'file',
              content: reportContent,
            },
          },
        },
      },
    },
  },
};

// ミッション8: 連絡先を整理しよう
const contactsCSV = [
  '名前,メール,グループ',
  '田中さん,tanaka@example.com,友達',
  '鈴木さん,suzuki@example.com,仕事',
  '田中さん,tanaka@example.com,友達',
  '佐藤さん,sato@example.com,家族',
  '山田さん,yamada@example.com,仕事',
  '鈴木さん,suzuki@example.com,仕事',
  '伊藤さん,ito@example.com,友達',
  '佐藤さん,sato@example.com,家族',
].join('\n');

const mission8FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'contacts.csv': {
              type: 'file',
              content: contactsCSV,
            },
          },
        },
      },
    },
  },
};

// ミッション9: 共有ファイルの設定
const mission9FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'shared': {
              type: 'directory',
              children: {
                'report.txt': {
                  type: 'file',
                  content: 'チームの月次レポートです。\n',
                },
                'count.sh': {
                  type: 'file',
                  content: '#!/bin/bash\necho "集計完了！"\n',
                  permissions: '-rw-r--r--',
                },
              },
            },
            'memo': {
              type: 'directory',
              children: {
                'todo.txt': {
                  type: 'file',
                  content: '1. レポート提出\n2. 会議準備\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

// ミッション10: 変更履歴を管理しよう
const gitLogContent10 = [
  'commit f1a2b3c (HEAD -> main)',
  'Author: watashi <watashi@example.com>',
  'Date:   Mon Jan 15 14:00:00 2024',
  '',
  '    update monthly report',
  '',
  'commit d4e5f6g',
  'Author: watashi <watashi@example.com>',
  'Date:   Mon Jan 15 10:00:00 2024',
  '',
  '    add initial report',
  '',
  'commit h7i8j9k',
  'Author: watashi <watashi@example.com>',
  'Date:   Mon Jan 14 09:00:00 2024',
  '',
  '    initial commit',
].join('\n');

const gitStatusOutput10 = [
  'On branch main',
  'Changes not staged for commit:',
  '  (use "git add <file>..." to update what will be committed)',
  '  (use "git restore <file>..." to discard changes in working directory)',
  '',
  '\tmodified:   monthly.txt',
  '',
  'no changes added to commit (use "git add" to track)',
].join('\n');

const mission10FS: FSNode = {
  type: 'directory',
  children: {
    home: {
      type: 'directory',
      children: {
        watashi: {
          type: 'directory',
          children: {
            'reports': {
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
                      content: gitLogContent10,
                    },
                    status: {
                      type: 'file',
                      content: gitStatusOutput10,
                    },
                  },
                },
                'monthly.txt': {
                  type: 'file',
                  content: '1月の活動報告\n- プロジェクトA: 順調に進行中\n- プロジェクトB: 来月開始予定\n',
                },
              },
            },
          },
        },
      },
    },
  },
};

export const story00: Story = {
  id: 'story-00',
  title: 'はじめてのパソコン冒険',
  description:
    'パソコンを手に入れたばかりのあなた。ターミナルを使って、ファイルやフォルダの基本操作を学びましょう。日常的な作業を通じて、パソコンの使い方をマスターしよう！',
  emoji: '\u{1F4BB}',
  course: 'beginner',
  missions: [
    // ミッション1: ここはどこ？
    {
      id: 'mission-00-01',
      title: 'ここはどこ？',
      description: '新しいパソコンを開いたら、まずは今いる場所を確認して、どんなファイルがあるか見てみよう。',
      goal: 'pwd と ls を使って、今いる場所とファイル構成を把握できるようになる',
      review: {
        question: '今いるフォルダの場所を表示するコマンドはどれですか？',
        choices: ['ls', 'cd', 'pwd', 'cat'],
        correctIndex: 2,
        explanation: 'pwd (Print Working Directory) は、今いるフォルダのパスを画面に表示するコマンドです。',
      },
      narrative:
        'やったー！新しいパソコンが届いた！さっそくターミナルを開いてみたけど、真っ黒な画面が出てきた。ここはどこだろう？まずは自分がどこにいるのか確認して、周りに何があるのか見てみよう。',
      initialCwd: '/home/watashi',
      initialFS: mission1FS,
      newCommands: ['pwd', 'ls'],
      objectives: [
        {
          id: 'obj-00-01-01',
          description: '今いる場所を確認しよう（pwd コマンド）',
          checks: [{ type: 'command_executed', command: 'pwd' }],
          hints: [
            { level: 1, text: '今いる場所を画面に表示するコマンドがあります。' },
            { level: 2, text: '「Print Working Directory」の略で、3文字のコマンドです。' },
            { level: 3, text: '「pwd」と入力してEnterキーを押してみましょう。' },
          ],
        },
        {
          id: 'obj-00-01-02',
          description: 'ファイルやフォルダの一覧を見よう（ls コマンド）',
          checks: [{ type: 'command_executed', command: 'ls' }],
          hints: [
            { level: 1, text: '今いる場所にあるファイルやフォルダを一覧表示するコマンドがあります。' },
            { level: 2, text: '「List」の略で、2文字のコマンドです。' },
            { level: 3, text: '「ls」と入力してEnterキーを押してみましょう。' },
          ],
        },
      ],
    },
    // ミッション2: フォルダの中を見て回ろう
    {
      id: 'mission-00-02',
      title: 'フォルダの中を見て回ろう',
      description: 'フォルダを移動して、中にあるファイルを読んでみよう。',
      goal: 'cd でフォルダを移動し、cat でファイルの中身を読めるようになる',
      review: {
        question: 'フォルダを移動するコマンドはどれですか？',
        choices: ['ls', 'cd', 'cat', 'pwd'],
        correctIndex: 1,
        explanation: 'cd (Change Directory) は、別のフォルダに移動するコマンドです。',
      },
      narrative:
        'パソコンの中には photos（写真）、music（音楽）、recipes（レシピ）などのフォルダがあるみたい。フォルダの中に移動して、どんなファイルがあるか見てみよう！',
      initialCwd: '/home/watashi',
      initialFS: mission2FS,
      newCommands: ['cd', 'cat'],
      objectives: [
        {
          id: 'obj-00-02-01',
          description: 'music（音楽）フォルダに移動しよう',
          checks: [{ type: 'cwd_equals', path: '/home/watashi/music' }],
          hints: [
            { level: 1, text: 'フォルダを移動するコマンドがあります。' },
            { level: 2, text: '「Change Directory」の略で、cd のあとに移動したいフォルダの名前を書きます。例えば cd music のように。' },
            { level: 3, text: '「cd music」と入力してEnterキーを押してみましょう。music は音楽フォルダのことです。' },
          ],
        },
        {
          id: 'obj-00-02-02',
          description: 'favorites.txt の中身を読もう',
          checks: [
            { type: 'command_executed', command: 'cat' },
            { type: 'output_contains', pattern: '星空' },
          ],
          hints: [
            { level: 1, text: 'ファイルの中身を画面に表示するコマンドがあります。' },
            { level: 2, text: '猫の鳴き声に似た3文字のコマンドです。' },
            { level: 3, text: '「cat favorites.txt」と入力してみましょう。favorites はお気に入りのことです。' },
          ],
        },
        {
          id: 'obj-00-02-03',
          description: 'ホームフォルダに戻ろう（.. は「1つ上のフォルダ」の意味）',
          checks: [{ type: 'cwd_equals', path: '/home/watashi' }],
          hints: [
            { level: 1, text: 'cd コマンドで上のフォルダに戻れます。' },
            { level: 2, text: '「..」は「ひとつ上のフォルダ」を意味します。' },
            { level: 3, text: '「cd ..」と入力してみましょう。または「cd /home/watashi」でも戻れます。' },
          ],
        },
      ],
    },
    // ミッション3: 写真アルバムを作ろう
    {
      id: 'mission-00-03',
      title: '写真アルバムを作ろう',
      description: '写真を整理するために、新しいフォルダやファイルを作ってみよう。',
      goal: 'mkdir でフォルダを作り、touch で空のファイルを作れるようになる',
      review: {
        question: '新しいフォルダを作るコマンドはどれですか？',
        choices: ['touch', 'mkdir', 'cp', 'mv'],
        correctIndex: 1,
        explanation: 'mkdir (Make Directory) は、新しいフォルダ（ディレクトリ）を作成するコマンドです。',
      },
      narrative:
        'photos（写真）フォルダの中がごちゃごちゃしてきた。「travel」（旅行）や「pets」（ペット）のフォルダを作って、写真を整理しよう！',
      initialCwd: '/home/watashi/photos',
      initialFS: mission3FS,
      newCommands: ['mkdir', 'touch'],
      objectives: [
        {
          id: 'obj-00-03-01',
          description: '「travel」（旅行）フォルダを作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/photos/travel' }],
          hints: [
            { level: 1, text: '新しいフォルダを作るコマンドがあります。' },
            { level: 2, text: '「Make Directory」の略で、5文字のコマンドです。' },
            { level: 3, text: '「mkdir travel」と入力してEnterキーを押してみましょう。travel は旅行フォルダです。' },
          ],
        },
        {
          id: 'obj-00-03-02',
          description: '「pets」（ペット）フォルダを作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/photos/pets' }],
          hints: [
            { level: 1, text: 'さっきと同じコマンドで、別の名前のフォルダを作りましょう。' },
            { level: 2, text: 'mkdir の後にフォルダ名を指定します。' },
            { level: 3, text: '「mkdir pets」と入力してみましょう。pets はペットフォルダです。' },
          ],
        },
        {
          id: 'obj-00-03-03',
          description: 'travel フォルダの中に「memories.txt」ファイルを作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/photos/travel/memories.txt' }],
          hints: [
            { level: 1, text: '空のファイルを作るコマンドがあります。' },
            { level: 2, text: 'touch コマンドでファイルを作れます。フォルダ名/ファイル名 のように書くと、フォルダの中にファイルを作れます。/ は「の中の」という意味です。たとえば travel/memories.txt は「travel フォルダの中の memories.txt」ということです。' },
            { level: 3, text: '「touch travel/memories.txt」と入力してみましょう。memories は思い出のことです。' },
          ],
          feedbacks: [
            { pattern: '^touch memories', message: 'travel フォルダの中に作りたいので、「travel/memories.txt」のようにフォルダ名/ファイル名 で指定しましょう。' },
          ],
        },
      ],
    },
    // ミッション4: ファイルを整理しよう
    {
      id: 'mission-00-04',
      title: 'ファイルを整理しよう',
      description: '間違った場所にあるファイルをコピーしたり、移動したりして整理しよう。',
      goal: 'cp でファイルをコピーし、mv や rm で整理できるようになる',
      review: {
        question: 'ファイルをコピーするコマンドはどれですか？',
        choices: ['mv', 'cp', 'rm', 'cat'],
        correctIndex: 1,
        explanation: 'cp (Copy) は、ファイルやフォルダをコピーするコマンドです。mv は移動、rm は削除です。',
      },
      narrative:
        'あれ？「important.txt」（大事なメモ）がホームフォルダに置きっぱなしだ。これは「memo」フォルダに入れるべきだよね。ファイルをコピーしたり移動したりして、きちんと整理しよう。',
      initialCwd: '/home/watashi',
      initialFS: mission4FS,
      newCommands: ['cp', 'mv'],
      objectives: [
        {
          id: 'obj-00-04-01',
          description: 'important.txt を memo フォルダにコピーしよう',
          checks: [{ type: 'file_exists', path: '/home/watashi/memo/important.txt' }],
          hints: [
            { level: 1, text: 'ファイルをコピーするコマンドがあります。' },
            { level: 2, text: '「Copy」の略で、2文字のコマンドです。cp のあとに「コピーしたいファイル名」「コピー先」の順に書きます。' },
            { level: 3, text: '「cp important.txt memo/important.txt」と入力してみましょう。important は大事なメモのことです。' },
          ],
          feedbacks: [
            { pattern: 'cp memo/', message: '順番が逆かもしれません。cp のあとはまず「コピーしたいファイル」、次に「コピー先」を書きます。' },
          ],
        },
        {
          id: 'obj-00-04-02',
          description: 'ホームフォルダの important.txt を片付けよう（移動または削除）',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/important.txt' }],
          hints: [
            { level: 1, text: 'ファイルを移動するコマンドや、削除するコマンドがあります。' },
            { level: 2, text: 'mv コマンドで移動、rm コマンドで削除できます。もうコピー済みなので削除でもOKです。' },
            { level: 3, text: '「rm important.txt」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション5: いらないファイルを片付けよう
    {
      id: 'mission-00-05',
      title: 'いらないファイルを片付けよう',
      description: 'もう使わない一時ファイル（.tmp）を探し出して、削除しよう。.tmp はパソコンが一時的に作ったファイルで、もう不要なものです。',
      goal: 'find でファイルを名前で検索し、rm で不要ファイルを削除できるようになる',
      review: {
        question: 'ファイルを名前で検索するコマンドはどれですか？',
        choices: ['grep', 'find', 'ls', 'cat'],
        correctIndex: 1,
        explanation: 'find は、ファイルやフォルダを名前やタイプで検索するコマンドです。grep はファイルの中身を検索します。',
      },
      narrative:
        'パソコンの中に名前の最後が「.tmp」のファイルがたまっている。.tmp は「temporary（一時的）」の略で、パソコンが一時的に作ったいらないファイルだよ。ファイル名の「.」のあとの部分（.txt や .tmp など）はファイルの種類を表しているんだ。探し出して片付けよう！',
      initialCwd: '/home/watashi',
      initialFS: mission5FS,
      newCommands: ['rm', 'find'],
      objectives: [
        {
          id: 'obj-00-05-01',
          description: '.tmp ファイルを探そう',
          checks: [
            { type: 'command_executed', command: 'find' },
            { type: 'output_contains', pattern: '.tmp' },
          ],
          hints: [
            { level: 1, text: 'ファイルを名前で検索するコマンドがあります。' },
            { level: 2, text: 'find コマンドで、特定の名前のファイルを探せます。find のあとに「.」（今いるフォルダ）と -name「名前のパターン」を書きます。' },
            { level: 3, text: '「find . -name "*.tmp"」と入力してみましょう。. は「今いるフォルダ」、* は「何でもOK」という意味です。' },
          ],
        },
        {
          id: 'obj-00-05-02',
          description: 'memo/old-memo.tmp を削除しよう',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/memo/old-memo.tmp' }],
          hints: [
            { level: 1, text: 'ファイルを削除するコマンドがあります。' },
            { level: 2, text: '「Remove」の略で、2文字のコマンドです。' },
            { level: 3, text: '「rm memo/old-memo.tmp」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-05-03',
          description: 'photos/junk.tmp を削除しよう',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/photos/junk.tmp' }],
          hints: [
            { level: 1, text: 'さっきと同じコマンドで別のファイルを削除しましょう。' },
            { level: 2, text: 'rm コマンドにファイルのパスを指定します。' },
            { level: 3, text: '「rm photos/junk.tmp」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-05-04',
          description: 'recipes/temp.tmp を削除しよう',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/recipes/temp.tmp' }],
          hints: [
            { level: 1, text: '最後の一時ファイルも削除しましょう。' },
            { level: 2, text: 'rm コマンドにファイルのパスを指定します。' },
            { level: 3, text: '「rm recipes/temp.tmp」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション6: 日記を書こう
    {
      id: 'mission-00-06',
      title: '日記を書こう',
      description: '新しい日記を書いて、過去の日記から特定の言葉を探してみよう。',
      goal: 'echo でファイルに書き込み、grep で特定の言葉を検索できるようになる',
      review: {
        question: 'ファイルの中から特定の文字列を検索するコマンドはどれですか？',
        choices: ['find', 'cat', 'grep', 'echo'],
        correctIndex: 2,
        explanation: 'grep は、ファイルの中身から指定した文字列を含む行を検索するコマンドです。find はファイル名で検索します。',
      },
      narrative:
        'diary（日記）フォルダに過去の日記がある。今日の日記を書いて、それから過去の日記から気になる言葉を探してみよう！',
      initialCwd: '/home/watashi/diary',
      initialFS: mission6FS,
      newCommands: ['echo', 'grep'],
      objectives: [
        {
          id: 'obj-00-06-01',
          description: '新しい日記ファイル 2024-01-17.txt を作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/diary/2024-01-17.txt' }],
          hints: [
            { level: 1, text: 'echo コマンドと > 記号を使うと、文字をファイルに書き込めます。> は「ファイルに書き込む」という意味です。' },
            { level: 2, text: 'echo "内容" > ファイル名 の形式で、ファイルを作って内容を書き込めます。' },
            { level: 3, text: '「echo "今日はいい天気だった。" > 2024-01-17.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-06-02',
          description: '過去の日記から「桜」という言葉を探そう',
          checks: [
            { type: 'command_executed', command: 'grep' },
            { type: 'output_contains', pattern: '桜' },
          ],
          hints: [
            { level: 1, text: 'ファイルの中から特定の言葉を検索するコマンドがあります。' },
            { level: 2, text: 'grep コマンドで、指定した言葉を含む行を探せます。' },
            { level: 3, text: '「grep 桜 2024-01-15.txt」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション7: 長いレポートを確認しよう
    {
      id: 'mission-00-07',
      title: '長いレポートを確認しよう',
      description: '長いレポートの最初と最後だけを見たり、行数を数えたりしてみよう。',
      goal: 'head と tail でファイルの一部を確認し、wc で行数を数えられるようになる',
      review: {
        question: 'ファイルの最後の数行だけを表示するコマンドはどれですか？',
        choices: ['head', 'tail', 'cat', 'wc'],
        correctIndex: 1,
        explanation: 'tail はファイルの末尾（最後の部分）を表示するコマンドです。head は最初の部分を表示します。',
      },
      narrative:
        '旅行のレポート（report.txt）が長くて全部読むのは大変。最初の部分と最後の部分だけ確認して、全体の行数も数えてみよう。',
      initialCwd: '/home/watashi',
      initialFS: mission7FS,
      newCommands: ['head', 'tail', 'wc'],
      objectives: [
        {
          id: 'obj-00-07-01',
          description: 'レポートの最初の部分を表示しよう（head コマンド）',
          checks: [{ type: 'command_executed', command: 'head' }],
          hints: [
            { level: 1, text: 'ファイルの最初の数行だけを表示するコマンドがあります。' },
            { level: 2, text: '「頭」を意味する英語のコマンドです。' },
            { level: 3, text: '「head report.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-07-02',
          description: 'レポートの最後の部分を表示しよう（tail コマンド）',
          checks: [{ type: 'command_executed', command: 'tail' }],
          hints: [
            { level: 1, text: 'ファイルの最後の数行だけを表示するコマンドがあります。' },
            { level: 2, text: '「しっぽ」を意味する英語のコマンドです。head の反対です。' },
            { level: 3, text: '「tail report.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-07-03',
          description: 'レポートの行数を数えよう（wc コマンド）',
          checks: [
            { type: 'command_executed', command: 'wc' },
          ],
          hints: [
            { level: 1, text: 'ファイルの行数や文字数を数えるコマンドがあります。' },
            { level: 2, text: 'wc（Word Count の略）コマンドで数を数えられます。コマンドのあとに「-」から始まるオプション（追加の指示）をつけると動きが変わります。-l は「行数（Lines）だけ数えて」という追加の指示です。' },
            { level: 3, text: '「wc -l report.txt」と入力してみましょう。-l は「行数だけを数える」という意味です。' },
          ],
        },
      ],
    },
    // ミッション8: 連絡先を整理しよう
    {
      id: 'mission-00-08',
      title: '連絡先を整理しよう',
      description: '連絡先データを名前順に並べ替えたり、同じ人が2回登録されているのを取り除いたり、名前だけを取り出したりしてみよう。',
      goal: 'sort で並べ替え、uniq で重複をまとめ、cut でほしい列だけを取り出せるようになる',
      review: {
        question: '重複した行を取り除くために sort と組み合わせて使うコマンドはどれですか？',
        choices: ['grep', 'cut', 'uniq', 'wc'],
        correctIndex: 2,
        explanation: 'uniq は、となり合った同じ行を1つにまとめるコマンドです。ただし、離れた場所にある同じ行には気づけません。だから先に sort で並べて、同じ行をとなりどうしにしてから uniq を使うのがコツです。',
      },
      narrative:
        '連絡先のファイル（contacts.csv）がぐちゃぐちゃで、同じ人が何回も登録されている。きれいに並べ替えて、重複を取り除こう！',
      initialCwd: '/home/watashi',
      initialFS: mission8FS,
      newCommands: ['sort', 'uniq', 'cut'],
      objectives: [
        {
          id: 'obj-00-08-01',
          description: '連絡先を名前順に並べ替えよう（sort コマンド）',
          checks: [{ type: 'command_executed', command: 'sort' }],
          hints: [
            { level: 1, text: 'ファイルの中身を並べ替えるコマンドがあります。' },
            { level: 2, text: '「並べ替え」を意味する英語のコマンドです。' },
            { level: 3, text: '「sort contacts.csv」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-08-02',
          description: '重複を取り除こう（uniq コマンド）',
          checks: [{ type: 'command_executed', command: 'uniq' }],
          hints: [
            { level: 1, text: '重複した行を取り除くコマンドがあります。' },
            { level: 2, text: 'uniq コマンドで同じ行を1つにまとめられます。ただし、uniq は「上の行と同じかどうか」しか見ないので、離れた場所にある同じ行には気づけません。だから先に sort で並べて、同じ行をとなりどうしにしてから使いましょう。' },
            { level: 3, text: '「uniq contacts.csv」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-08-03',
          description: '名前の列だけを取り出そう（cut コマンド）',
          checks: [
            { type: 'command_executed', command: 'cut' },
            { type: 'output_contains', pattern: '名前' },
          ],
          hints: [
            { level: 1, text: 'contacts.csv は「,」（カンマ）でデータが区切られています。この中から名前の部分だけを切り出すコマンドがあります。' },
            { level: 2, text: 'cut コマンドで列を取り出せます。-d, は「カンマで区切って」、-f1 は「1番目の列（名前）を取り出して」という追加の指示です。' },
            { level: 3, text: '「cut -d, -f1 contacts.csv」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション9: 共有ファイルの設定
    {
      id: 'mission-00-09',
      title: '共有ファイルの設定',
      description: 'ファイルには「読んでいい」「書き込んでいい」「動かしていい」の3つの許可があります。集計スクリプトに「動かしていい」の許可を追加しよう。',
      goal: 'chmod でファイルの許可を変更し、プログラムを実行できるようになる',
      review: {
        question: 'ファイルに実行権限を追加するコマンドはどれですか？',
        choices: ['chown +x', 'chmod +x', 'cp +x', 'mv +x'],
        correctIndex: 1,
        explanation: 'chmod (Change Mode) はファイルの許可を変更するコマンドです。+x の x は「execute（実行）」の頭文字で、「このファイルをプログラムとして動かしていいよ」という許可を追加します。',
      },
      narrative:
        'shared（共有）フォルダにある集計スクリプト（count.sh）を動かしたいけど、「動かしていい」の許可がまだ出ていない。パソコンではファイルごとに「読んでいい」「書き込んでいい」「動かしていい」の許可を設定できるんだ。chmod コマンドで「動かしていい」の許可を追加しよう！',
      initialCwd: '/home/watashi',
      initialFS: mission9FS,
      newCommands: ['chmod'],
      objectives: [
        {
          id: 'obj-00-09-01',
          description: '集計スクリプトに「動かしていい」の許可をつけよう（chmod コマンド）',
          checks: [{ type: 'command_executed', command: 'chmod' }],
          hints: [
            { level: 1, text: 'ファイルの許可（できること）を変更するコマンドがあります。' },
            { level: 2, text: 'chmod（Change Mode の略）コマンドで、+x をつけると「このファイルを動かしていいよ」の許可を追加できます。x は「execute（実行）」の頭文字です。プログラム（.sh ファイルなど）を動かすときに必要です。' },
            { level: 3, text: '「chmod +x shared/count.sh」と入力してみましょう。shared は共有フォルダ、count.sh は集計スクリプトです。' },
          ],
        },
        {
          id: 'obj-00-09-02',
          description: 'やることリストを sort で並べ替えて表示しよう',
          checks: [{ type: 'command_executed', command: 'sort' }],
          hints: [
            { level: 1, text: 'ファイルの中身を並べ替えて表示するコマンドがあります。' },
            { level: 2, text: 'sort コマンドにファイル名を渡すと、中身を並べ替えて表示します。' },
            { level: 3, text: '「sort memo/todo.txt」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション10: 変更履歴を管理しよう
    {
      id: 'mission-00-10',
      title: '変更履歴を管理しよう',
      description: 'git（ギット）は「いつ・誰が・何を変えたか」を記録してくれるツールです。レポートの変更履歴を確認してみよう。',
      goal: 'git status で今の状態を確認し、git log でこれまでの変更の記録（履歴）を見られるようになる',
      review: {
        question: 'ファイルの変更状態を確認する git コマンドはどれですか？',
        choices: ['git log', 'git status', 'git diff', 'git add'],
        correctIndex: 1,
        explanation: 'git status は、「どのファイルが変更されたか」「まだ記録していない変更があるか」などの今の状態を表示します。',
      },
      narrative:
        'reports（レポート）フォルダでは git（ギット）を使って変更の記録を管理しているよ。git は「いつ・誰が・何を変えたか」をぜんぶ覚えてくれる便利なツールなんだ。どんな変更が行われたか確認してみよう！',
      initialCwd: '/home/watashi/reports',
      initialFS: mission10FS,
      newCommands: ['git'],
      objectives: [
        {
          id: 'obj-00-10-01',
          description: 'レポートの現在の状態を確認しよう（git status）',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'modified' },
          ],
          hints: [
            { level: 1, text: 'ファイルの変更状態を確認するGitコマンドがあります。' },
            { level: 2, text: 'git status コマンドで、どのファイルが変更されたか確認できます。' },
            { level: 3, text: '「git status」と入力してEnterキーを押してみましょう。' },
          ],
        },
        {
          id: 'obj-00-10-02',
          description: '変更の履歴を見てみよう（git log）',
          checks: [
            { type: 'command_executed', command: 'git' },
            { type: 'output_contains', pattern: 'Author:' },
          ],
          hints: [
            { level: 1, text: '過去の変更履歴を表示するGitコマンドがあります。' },
            { level: 2, text: 'git log コマンドで、過去にどんな変更が行われたか確認できます。' },
            { level: 3, text: '「git log」と入力してEnterキーを押してみましょう。' },
          ],
        },
      ],
    },
  ],
  unlockRequires: [],
};
