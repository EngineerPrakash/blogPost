#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise(res => rl.question(q, a => res(a.trim())));

function slugify(str){
  return String(str)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function today(){
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const day = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${day}`;
}

async function main(){
  const args = process.argv.slice(2);
  const getArg = (name) => {
    const idx = args.findIndex(a => a === `--${name}`);
    return idx >= 0 ? args[idx+1] : null;
  };

  let title = getArg('title') || await ask('Title: ');
  while(!title){ title = await ask('Title (required): '); }
  let slug = getArg('slug') || slugify(title);
  let date = getArg('date') || today();
  let tags = getArg('tags') || (await ask('Tags (comma separated, optional): '));
  let cover = getArg('cover') || (await ask('Cover path (e.g., /assets/cover-abstract-1.svg, optional): '));
  let desc = getArg('desc') || (await ask('Description (optional): '));

  const frontTags = tags ? `[${tags.split(',').map(t=>t.trim()).filter(Boolean).map(t=>` ${t}`).join(',')}${tags? ' ': ''}]` : '[]';

  const postsDir = path.join(process.cwd(), 'src', 'posts');
  if(!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });

  let filename = `${slug}.md`;
  let filepath = path.join(postsDir, filename);
  let n = 2;
  while(fs.existsSync(filepath)){
    filename = `${slug}-${n}.md`;
    filepath = path.join(postsDir, filename);
    n++;
  }

  const frontMatter = `---\n`+
`title: ${title}\n`+
`description: ${desc || ''}\n`+
`date: ${date}\n`+
`tags: ${frontTags}\n`+
`layout: layouts/post.njk\n`+
`${cover ? `cover: ${cover}\n` : ''}`+
`---\n\n`+
`Write your content here.\n`;

  fs.writeFileSync(filepath, frontMatter, 'utf8');
  rl.close();
  console.log(`Created: src/posts/${filename}`);
}

main().catch(e => { console.error(e); process.exit(1); });

