import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postDir = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postDir)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        }
    })

    return allPostsData.sort((a, b) => {
        if (a['date'] < b['date']) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postDir)
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostsData(id) {
    const fullPath = path.join(postDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    const contentProcess = await remark()
        .use(html)
        .process(matterResult.content)

    const contentHtml = contentProcess.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}