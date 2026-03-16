import fs from 'fs';
import path from 'path';

export default function Home({ htmlContent }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'cafe_app_content.html');
  const raw = fs.readFileSync(filePath, 'utf8');

  // Extract just the body content and styles to inject into Next.js
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*)<\/body>/);
  const htmlContent = bodyMatch ? bodyMatch[1] : raw;

  return {
    props: { htmlContent },
  };
}
