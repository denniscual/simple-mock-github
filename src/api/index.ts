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

// type GetRepoResponses = Endpoints['GET /search/repositories']['response']['data']

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
    const perPage = input.per_page ? input.per_page : 10
    const res = await octokit.request(
        'GET /repos/{owner}/{repo}/contributors',
        {
            ...input,
            per_page: perPage,
        }
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

/**
 * ------------ Issues -----------
 * */

type GetRepoIssuesInput = Endpoints['GET /repos/:owner/:repo/issues']['parameters']
type GetRepoIssuesResponse = Endpoints['GET /repos/:owner/:repo/issues']['response']
export type GetRepoIssuesData = GetRepoIssuesResponse['data']

const IssuesStates = {
    open: 'open',
    closed: 'closed',
}

async function getRepoIssues(_: string, input: GetRepoIssuesInput) {
    const state = Boolean(input.state)
        ? input.state
        : (IssuesStates.open as any)
    const page = Boolean(input.page) ? input.page : 1

    const res = (await octokit.request('GET /repos/{owner}/{repo}/issues', {
        ...input,
        per_page: 30,
        state,
        page,
    })) as GetRepoIssuesResponse

    return res.data
}
getRepoIssues.key = 'RepoIssues'

const prefetchRepoIssues: RoutePreloadFunction = (params) => {
    const input: GetRepoIssuesInput = {
        ...(params as {
            owner: string
            repo: string
        }),
    }
    queryCache.prefetchQuery(getRepoIssues.key, (key) =>
        getRepoIssues(key as string, input)
    )
}

/**
 * ------------ Repo issue -----------
 * */

type GetRepoIssueInput = Endpoints['GET /repos/:owner/:repo/issues/:issue_number']['parameters']
type GetRepoIssueResponse = Endpoints['GET /repos/:owner/:repo/issues/:issue_number']['response']
export type GetRepoIssueData = GetRepoIssueResponse['data']

async function getRepoIssue(
    _: string,
    input: GetRepoIssueInput
): Promise<GetRepoIssueData> {
    const res = (await octokit.request(
        'GET /repos/{owner}/{repo}/issues/{issue_number}',
        input
    )) as GetRepoIssueResponse

    return res.data
}
getRepoIssue.key = 'GetRepoIssue'

const prefetchRepoIssue: RoutePreloadFunction = (params) => {
    const { owner, repo, issueNumber } = params as {
        owner: string
        repo: string
        issueNumber: string
    }
    queryCache.prefetchQuery(getRepoIssues.key, (key) =>
        getRepoIssue(key as string, {
            owner,
            repo,
            issue_number: Number(issueNumber),
        })
    )
}

/**
 * ------------ Pull requests -----------
 * */

type GetRepoPullRequestsInput = Endpoints['GET /repos/:owner/:repo/pulls']['parameters']
type GetRepoPullRequestsResponse = Endpoints['GET /repos/:owner/:repo/pulls']['response']
export type GetRepoPullRequestsData = GetRepoPullRequestsResponse['data']

const PullRequestsStates = {
    open: 'open',
    closed: 'closed',
}

async function getRepoPullRequests(
    _: string,
    input: GetRepoPullRequestsInput
): Promise<GetRepoPullRequestsData> {
    const state = Boolean(input.state)
        ? input.state
        : (PullRequestsStates.open as any)
    const page = Boolean(input.page) ? input.page : 1

    const res = (await octokit.request('GET /repos/{owner}/{repo}/pulls', {
        ...input,
        per_page: 30,
        state,
        page,
    })) as GetRepoPullRequestsResponse

    return res.data
}
getRepoPullRequests.key = 'RepoPullRequests'

const prefetchRepoPullRequests: RoutePreloadFunction = (params) => {
    const input: GetRepoPullRequestsInput = {
        ...(params as {
            owner: string
            repo: string
        }),
    }
    queryCache.prefetchQuery(getRepoPullRequests.key, (key) =>
        getRepoPullRequests(key as string, input)
    )
}

export {
    getRepo,
    prefetchRepo,
    getRepoREADME,
    prefetchRepoREADME,
    getRepoContributors,
    prefetchRepoContributors,
    getRepoIssues,
    prefetchRepoIssues,
    getRepoIssue,
    prefetchRepoIssue,
    getRepoPullRequests,
    prefetchRepoPullRequests,
    // getRepoTopics,
    // prefetchRepoTopics,
}
