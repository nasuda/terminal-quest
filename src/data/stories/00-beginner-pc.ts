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
            '写真': {
              type: 'directory',
              children: {},
            },
            '音楽': {
              type: 'directory',
              children: {},
            },
            'メモ': {
              type: 'directory',
              children: {},
            },
            'ようこそ.txt': {
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
            '写真': {
              type: 'directory',
              children: {
                '旅行の写真.txt': {
                  type: 'file',
                  content: '海辺で撮った写真です。とてもきれいでした。\n',
                },
              },
            },
            '音楽': {
              type: 'directory',
              children: {
                'お気に入り.txt': {
                  type: 'file',
                  content: '1. 夏の思い出\n2. 星空のメロディー\n3. 雨の日の歌\n',
                },
                'プレイリスト': {
                  type: 'directory',
                  children: {
                    'ドライブ用.txt': {
                      type: 'file',
                      content: 'アップテンポな曲を集めました！\n',
                    },
                  },
                },
              },
            },
            'レシピ': {
              type: 'directory',
              children: {
                'カレー.txt': {
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
            '写真': {
              type: 'directory',
              children: {
                '海の写真.txt': {
                  type: 'file',
                  content: '青い海と白い砂浜の写真です。\n',
                },
                '山の写真.txt': {
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
            '写真': {
              type: 'directory',
              children: {
                '旅行': {
                  type: 'directory',
                  children: {},
                },
                'ペット': {
                  type: 'directory',
                  children: {},
                },
              },
            },
            'メモ': {
              type: 'directory',
              children: {
                '買い物リスト.txt': {
                  type: 'file',
                  content: '牛乳、パン、たまご\n',
                },
              },
            },
            '大事なメモ.txt': {
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
            'メモ': {
              type: 'directory',
              children: {
                '買い物リスト.txt': {
                  type: 'file',
                  content: '牛乳、パン、たまご\n',
                },
                'やることリスト.txt': {
                  type: 'file',
                  content: '1. 掃除\n2. 買い物\n3. 料理\n',
                },
                '古いメモ.tmp': {
                  type: 'file',
                  content: '一時ファイルです。\n',
                },
              },
            },
            '写真': {
              type: 'directory',
              children: {
                '旅行': {
                  type: 'directory',
                  children: {
                    'おもいで.txt': {
                      type: 'file',
                      content: '楽しい旅行の思い出です。\n',
                    },
                  },
                },
                'ゴミ.tmp': {
                  type: 'file',
                  content: '不要な一時ファイルです。\n',
                },
              },
            },
            'レシピ': {
              type: 'directory',
              children: {
                'カレー.txt': {
                  type: 'file',
                  content: '材料: じゃがいも、にんじん、たまねぎ、お肉\n作り方: 野菜を切って煮込む\n',
                },
                '一時ファイル.tmp': {
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
            '日記': {
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
            'レポート.txt': {
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
            '連絡先.csv': {
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
            '共有フォルダ': {
              type: 'directory',
              children: {
                'レポート.txt': {
                  type: 'file',
                  content: 'チームの月次レポートです。\n',
                },
                '集計スクリプト.sh': {
                  type: 'file',
                  content: '#!/bin/bash\necho "集計完了！"\n',
                  permissions: '-rw-r--r--',
                },
              },
            },
            'メモ': {
              type: 'directory',
              children: {
                'やることリスト.txt': {
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
  '\tmodified:   月次レポート.txt',
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
            'レポート': {
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
                      content: gitLogContent10,
                    },
                    'status-output': {
                      type: 'file',
                      content: gitStatusOutput10,
                    },
                  },
                },
                '月次レポート.txt': {
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
      narrative:
        'パソコンの中には「写真」「音楽」「レシピ」などのフォルダがあるみたい。フォルダの中に移動して、どんなファイルがあるか見てみよう！',
      initialCwd: '/home/watashi',
      initialFS: mission2FS,
      newCommands: ['cd', 'cat'],
      objectives: [
        {
          id: 'obj-00-02-01',
          description: '音楽フォルダに移動しよう',
          checks: [{ type: 'cwd_equals', path: '/home/watashi/音楽' }],
          hints: [
            { level: 1, text: 'フォルダを移動するコマンドがあります。' },
            { level: 2, text: '「Change Directory」の略で、2文字のコマンドの後に移動先のフォルダ名を指定します。' },
            { level: 3, text: '「cd 音楽」と入力してEnterキーを押してみましょう。' },
          ],
        },
        {
          id: 'obj-00-02-02',
          description: 'お気に入り.txt の中身を読もう',
          checks: [{ type: 'output_contains', pattern: '星空' }],
          hints: [
            { level: 1, text: 'ファイルの中身を画面に表示するコマンドがあります。' },
            { level: 2, text: '猫の鳴き声に似た3文字のコマンドです。' },
            { level: 3, text: '「cat お気に入り.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-02-03',
          description: 'ホームフォルダに戻ろう',
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
      narrative:
        '写真フォルダの中がごちゃごちゃしてきた。「旅行」や「ペット」のフォルダを作って、写真を整理しよう！',
      initialCwd: '/home/watashi/写真',
      initialFS: mission3FS,
      newCommands: ['mkdir', 'touch'],
      objectives: [
        {
          id: 'obj-00-03-01',
          description: '「旅行」フォルダを作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/写真/旅行' }],
          hints: [
            { level: 1, text: '新しいフォルダを作るコマンドがあります。' },
            { level: 2, text: '「Make Directory」の略で、5文字のコマンドです。' },
            { level: 3, text: '「mkdir 旅行」と入力してEnterキーを押してみましょう。' },
          ],
        },
        {
          id: 'obj-00-03-02',
          description: '「ペット」フォルダを作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/写真/ペット' }],
          hints: [
            { level: 1, text: 'さっきと同じコマンドで、別の名前のフォルダを作りましょう。' },
            { level: 2, text: 'mkdir の後にフォルダ名を指定します。' },
            { level: 3, text: '「mkdir ペット」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-03-03',
          description: '旅行フォルダの中に「おもいで.txt」ファイルを作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/写真/旅行/おもいで.txt' }],
          hints: [
            { level: 1, text: '空のファイルを作るコマンドがあります。' },
            { level: 2, text: 'touch コマンドでファイルを作れます。フォルダ名/ファイル名 で指定できます。' },
            { level: 3, text: '「touch 旅行/おもいで.txt」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション4: ファイルを整理しよう
    {
      id: 'mission-00-04',
      title: 'ファイルを整理しよう',
      description: '間違った場所にあるファイルをコピーしたり、移動したりして整理しよう。',
      narrative:
        'あれ？「大事なメモ.txt」がホームフォルダに置きっぱなしだ。これは「メモ」フォルダに入れるべきだよね。ファイルをコピーしたり移動したりして、きちんと整理しよう。',
      initialCwd: '/home/watashi',
      initialFS: mission4FS,
      newCommands: ['cp', 'mv'],
      objectives: [
        {
          id: 'obj-00-04-01',
          description: '大事なメモ.txt をメモフォルダにコピーしよう',
          checks: [{ type: 'file_exists', path: '/home/watashi/メモ/大事なメモ.txt' }],
          hints: [
            { level: 1, text: 'ファイルをコピーするコマンドがあります。' },
            { level: 2, text: '「Copy」の略で、2文字のコマンドです。コピー元とコピー先を指定します。' },
            { level: 3, text: '「cp 大事なメモ.txt メモ/大事なメモ.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-04-02',
          description: 'ホームフォルダの大事なメモ.txt を片付けよう（移動または削除）',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/大事なメモ.txt' }],
          hints: [
            { level: 1, text: 'ファイルを移動するコマンドや、削除するコマンドがあります。' },
            { level: 2, text: 'mv コマンドで移動、rm コマンドで削除できます。もうコピー済みなので削除でもOKです。' },
            { level: 3, text: '「rm 大事なメモ.txt」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション5: いらないファイルを片付けよう
    {
      id: 'mission-00-05',
      title: 'いらないファイルを片付けよう',
      description: '不要な一時ファイルを探し出して、削除しよう。',
      narrative:
        'パソコンの中に「.tmp」という拡張子の一時ファイルがたまっている。これは不要なファイルなので、探し出して片付けよう！',
      initialCwd: '/home/watashi',
      initialFS: mission5FS,
      newCommands: ['rm', 'find'],
      objectives: [
        {
          id: 'obj-00-05-01',
          description: '.tmp ファイルを探そう',
          checks: [{ type: 'output_contains', pattern: '.tmp' }],
          hints: [
            { level: 1, text: 'ファイルを名前で検索するコマンドがあります。' },
            { level: 2, text: 'find コマンドで、特定の名前のファイルを探せます。-name オプションを使います。' },
            { level: 3, text: '「find . -name "*.tmp"」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-05-02',
          description: 'メモ/古いメモ.tmp を削除しよう',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/メモ/古いメモ.tmp' }],
          hints: [
            { level: 1, text: 'ファイルを削除するコマンドがあります。' },
            { level: 2, text: '「Remove」の略で、2文字のコマンドです。' },
            { level: 3, text: '「rm メモ/古いメモ.tmp」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-05-03',
          description: '写真/ゴミ.tmp を削除しよう',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/写真/ゴミ.tmp' }],
          hints: [
            { level: 1, text: 'さっきと同じコマンドで別のファイルを削除しましょう。' },
            { level: 2, text: 'rm コマンドにファイルのパスを指定します。' },
            { level: 3, text: '「rm 写真/ゴミ.tmp」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-05-04',
          description: 'レシピ/一時ファイル.tmp を削除しよう',
          checks: [{ type: 'file_not_exists', path: '/home/watashi/レシピ/一時ファイル.tmp' }],
          hints: [
            { level: 1, text: '最後の一時ファイルも削除しましょう。' },
            { level: 2, text: 'rm コマンドにファイルのパスを指定します。' },
            { level: 3, text: '「rm レシピ/一時ファイル.tmp」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション6: 日記を書こう
    {
      id: 'mission-00-06',
      title: '日記を書こう',
      description: '新しい日記を書いて、過去の日記から特定の言葉を探してみよう。',
      narrative:
        '日記フォルダに過去の日記がある。今日の日記を書いて、それから過去の日記から気になる言葉を探してみよう！',
      initialCwd: '/home/watashi/日記',
      initialFS: mission6FS,
      newCommands: ['echo', 'grep'],
      objectives: [
        {
          id: 'obj-00-06-01',
          description: '新しい日記ファイル 2024-01-17.txt を作ろう',
          checks: [{ type: 'file_exists', path: '/home/watashi/日記/2024-01-17.txt' }],
          hints: [
            { level: 1, text: 'echo コマンドとリダイレクト（>）を使うとファイルに文字を書き込めます。' },
            { level: 2, text: 'echo "内容" > ファイル名 の形式で、ファイルを作って内容を書き込めます。' },
            { level: 3, text: '「echo "今日はいい天気だった。" > 2024-01-17.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-06-02',
          description: '過去の日記から「桜」という言葉を探そう',
          checks: [{ type: 'output_contains', pattern: '桜' }],
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
      narrative:
        '旅行のレポートが長くて全部読むのは大変。最初の部分と最後の部分だけ確認して、全体の行数も数えてみよう。',
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
            { level: 3, text: '「head レポート.txt」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-07-02',
          description: 'レポートの最後の部分を表示しよう（tail コマンド）',
          checks: [{ type: 'command_executed', command: 'tail' }],
          hints: [
            { level: 1, text: 'ファイルの最後の数行だけを表示するコマンドがあります。' },
            { level: 2, text: '「しっぽ」を意味する英語のコマンドです。head の反対です。' },
            { level: 3, text: '「tail レポート.txt」と入力してみましょう。' },
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
            { level: 2, text: '「Word Count」の略のコマンドで、-l オプションをつけると行数だけ表示できます。' },
            { level: 3, text: '「wc -l レポート.txt」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション8: 連絡先を整理しよう
    {
      id: 'mission-00-08',
      title: '連絡先を整理しよう',
      description: '連絡先データを並べ替えたり、重複を取り除いたりしてみよう。',
      narrative:
        '連絡先のファイルがぐちゃぐちゃで、同じ人が何回も登録されている。きれいに並べ替えて、重複を取り除こう！',
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
            { level: 3, text: '「sort 連絡先.csv」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-08-02',
          description: '重複を取り除こう（sort | uniq を使おう）',
          checks: [{ type: 'command_executed', command: 'uniq' }],
          hints: [
            { level: 1, text: '重複した行を取り除くコマンドがあります。「|」（パイプ）で sort と組み合わせます。' },
            { level: 2, text: 'sort で並べ替えた結果を uniq に渡すと、重複が取り除かれます。' },
            { level: 3, text: '「sort 連絡先.csv | uniq」と入力してみましょう。' },
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
            { level: 1, text: 'CSVの特定の列だけを切り出すコマンドがあります。' },
            { level: 2, text: 'cut コマンドで区切り文字（-d）と列番号（-f）を指定します。' },
            { level: 3, text: '「cut -d, -f1 連絡先.csv」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション9: 共有ファイルの設定
    {
      id: 'mission-00-09',
      title: '共有ファイルの設定',
      description: 'ファイルの権限を設定して、スクリプトを実行できるようにしよう。',
      narrative:
        '共有フォルダにある集計スクリプトを実行したいけど、実行する権限がない。権限を設定して使えるようにしよう！',
      initialCwd: '/home/watashi',
      initialFS: mission9FS,
      newCommands: ['chmod'],
      objectives: [
        {
          id: 'obj-00-09-01',
          description: '集計スクリプトに実行権限をつけよう（chmod コマンド）',
          checks: [{ type: 'command_executed', command: 'chmod' }],
          hints: [
            { level: 1, text: 'ファイルの権限（パーミッション）を変更するコマンドがあります。' },
            { level: 2, text: '「Change Mode」の略のコマンドで、+x をつけると実行権限を追加できます。' },
            { level: 3, text: '「chmod +x 共有フォルダ/集計スクリプト.sh」と入力してみましょう。' },
          ],
        },
        {
          id: 'obj-00-09-02',
          description: 'やることリストを sort で並べ替えて表示しよう',
          checks: [{ type: 'command_executed', command: 'sort' }],
          hints: [
            { level: 1, text: 'cat でファイルの中身を表示し、パイプ（|）で sort に渡してみましょう。' },
            { level: 2, text: 'cat ファイル | sort の形式でコマンドをつなげます。' },
            { level: 3, text: '「cat メモ/やることリスト.txt | sort」と入力してみましょう。' },
          ],
        },
      ],
    },
    // ミッション10: 変更履歴を管理しよう
    {
      id: 'mission-00-10',
      title: '変更履歴を管理しよう',
      description: 'git を使ってレポートの変更履歴を確認してみよう。',
      narrative:
        'レポートフォルダでは git を使って変更履歴を管理している。どんな変更が行われたか確認してみよう！',
      initialCwd: '/home/watashi/レポート',
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
            { type: 'output_contains', pattern: 'commit' },
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
