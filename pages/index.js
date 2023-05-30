import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';
import Date from '../components/date';



export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}


const hanldeSubmit = (e) => {
  e.preventDefault();
  console.log("el form fue submiteado")
}

const handleDelete = () => {
  console.log("delete entry")
}



export default function Home({ allPostsData }) {

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Sobre esta aplicacion</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <div className={utilStyles.container_entry} key={id}>
              <li className={utilStyles.listItem} >
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
              <button onClick={handleDelete}>Delete</button>
            </div>

          ))}
        </ul>
      </section>
      <section>
        <h2 className={utilStyles.headingLg}>Create new entry</h2>
        <form onSubmit={hanldeSubmit}>
          <label htmlFor='titleEntry'>Title</label> <br/>
          <input id="titleEntry" name="title" type="text"></input><br />
          <label htmlFor='descriptionEntry' name="description">Textarea</label><br />
          <textarea id="descriptionEntry"></textarea> <br />
          <button type="submit">Post</button>
        </form>
      </section>
    </Layout>
  );
}
