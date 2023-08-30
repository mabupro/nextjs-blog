import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                {/* 投稿の内容をHTMLとしてレンダリング */}
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

// 事前レンダリングのためのパスを取得
export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

// 与えられたパラメータに基づいてページのプロップスを取得
export async function getStaticProps({ params }) {
    // getPostData関数を非同期で呼び出し、投稿データを取得
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}

