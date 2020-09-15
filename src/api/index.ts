import { Octokit } from '@octokit/rest'
import { queryCache } from 'react-query'
import { Endpoints } from '@octokit/types'

// TODO: We need to handle the fetch error

/**
 * ------------ types -----------
 * */

/**
 * ------------ Utils -----------
 * */

const octokit = new Octokit({
    // TODO: We need to move this into env.
    auth: '598275eeb8d7999136872313de04f4ae86eea6dd',
    userAgent: 'myApp v1.2.3',
    baseUrl: 'https://api.github.com',
    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error,
    },
    request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0,
    },
})

/**
 * ------------ Repository -----------
 * */

// GET Repo
type GetRepoInput = Endpoints['GET /repos/:owner/:repo']['parameters']
type GetRepoResponse = Endpoints['GET /repos/:owner/:repo']['response']
export type GetRepoData = GetRepoResponse['data']

async function getRepo(
    _: string,
    input: GetRepoInput = {
        owner: 'facebook',
        repo: 'react',
    }
): Promise<GetRepoData> {
    const response = (await octokit.request(
        'GET /repos/{owner}/{repo}',
        input
    )) as GetRepoResponse

    return response.data
}
getRepo.key = 'Repo'

type RoutePreloadFunction = (
    params: Record<string, string>,
    location: any,
    index: number
) => void

const prefetchRepo: RoutePreloadFunction = (params) => {
    queryCache.prefetchQuery(getRepo.key, (key) =>
        getRepo(key as string, params as { owner: string; repo: string })
    )
}

// Get Repo README

type GetRepoREADMEInput = Endpoints['GET /repos/:owner/:repo/readme']['parameters']
type GetRepoREADMEResponse = Endpoints['GET /repos/:owner/:repo/readme']['response']
type PostMarkdownResponse = Endpoints['POST /markdown']['response']

async function getRepoREADME(
    _: string,
    input: GetRepoREADMEInput = {
        owner: 'facebook',
        repo: 'react',
    }
): Promise<string> {
    // First is to get the encoded readme content.
    const readMeRes = (await octokit.request(
        'GET /repos/{owner}/{repo}/readme',
        input
    )) as GetRepoREADMEResponse

    // Then turn the markdown into GFM specs compliant
    const postRes = (await octokit.request('POST /markdown', {
        text: atob(readMeRes.data.content),
    })) as PostMarkdownResponse

    return postRes.data
}
getRepoREADME.key = 'RepoREADME'

const prefetchRepoREADME: RoutePreloadFunction = (params) => {
    queryCache.prefetchQuery(getRepoREADME.key, (key) =>
        getRepoREADME(
            key as string,
            params as {
                owner: string
                repo: string
            }
        )
    )
}

// Get Repo contributors

type GetRepoContributorsInput = Endpoints['GET /repos/:owner/:repo/contributors']['parameters']
type GetRepoContributorsResponse = Endpoints['GET /repos/:owner/:repo/contributors']['response']
export type GetRepoContributorsData = GetRepoContributorsResponse['data']

async function getRepoContributors(
    _: string,
    input: GetRepoContributorsInput
): Promise<GetRepoContributorsData> {
    const res = await octokit.request(
        'GET /repos/{owner}/{repo}/contributors',
        input
    )
    return res.data
}
getRepoContributors.key = 'RepoContributors'

const prefetchRepoContributors: RoutePreloadFunction = (params) => {
    const input: GetRepoContributorsInput = {
        ...(params as {
            owner: string
            repo: string
        }),
        per_page: 10,
    }
    queryCache.prefetchQuery(getRepoContributors.key, (key) =>
        getRepoContributors(key as string, input)
    )
}

// Get Repo Topics
// type GetRepoTopicsInput = Endpoints['GET /repos/:owner/:repo/topics']['parameters']
// type GetRepoTopicsResponse = Endpoints['GET /repos/:owner/:repo/topics']['response']
// export type GetRepoTopicsData = GetRepoTopicsResponse['data']

// async function getRepoTopics(
//     _: string,
//     input: GetRepoTopicsInput
// ): Promise<GetRepoTopicsData> {
//     // First is to get the encoded readme content.
//     const res = (await octokit.request(
//         'GET /repos/{owner}/{repo}/topics',
//         input
//     )) as GetRepoTopicsResponse

//     return res.data
// }
// getRepoTopics.key = 'RepoTopics'

// const prefetchRepoTopics: RoutePreloadFunction = (params) => {
//     const input = {
//         owner: params.owner,
//         repo: params.repo,
//         mediaType: {
//             previews: ['mercy'],
//         },
//     }

//     queryCache.prefetchQuery(getRepoREADME.key, (key) => {
//         getRepoTopics(key as string, input)
//     })
// }

export {
    getRepo,
    prefetchRepo,
    getRepoREADME,
    prefetchRepoREADME,
    getRepoContributors,
    prefetchRepoContributors,
    // getRepoTopics,
    // prefetchRepoTopics,
}
