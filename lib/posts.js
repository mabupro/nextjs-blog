import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// 'posts'ディレクトリへのパスを設定
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // /posts ディレクトリ内のファイル名を取得
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // ファイル名から ".md" を削除してIDを取得
        const id = fileName.replace(/\.md$/, '');

        // markdownファイルを文字列として読み込む
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // gray-matterを使用して投稿のメタデータセクションを解析
        const matterResult = matter(fileContents);

        // idとデータを組み合わせる
        return {
            id,
            ...matterResult.data,
        };
    });
    // 日付順に投稿をソート
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    // 以下のような配列を返す:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ''),
            },
        };
    });
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // gray-matterを使用して投稿のメタデータセクションを解析
    const matterResult = matter(fileContents);

    // remarkを使用してmarkdownをHTML文字列に変換
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    // idとcontentHtmlとデータを組み合わせる
    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}
