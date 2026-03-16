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

  // Extract styles from <head> and body content to inject into Next.js
  const styleMatches = [...raw.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)];
  const styles = styleMatches.map(m => `<style>${m[1]}</style>`).join('\n');
  const bodyMatch = raw.match(/<body[^>]*>([\s\S]*)<\/body>/);
  const body = bodyMatch ? bodyMatch[1] : raw;
  const htmlContent = styles + body;

  return {
    props: { htmlContent },
  };
}
