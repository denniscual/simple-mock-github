import { Octokit } from '@octokit/rest'
import { queryCache } from 'react-query'
import { Endpoints } from '@octokit/types'

/**
 * ------------ types -----------
 * */

type RoutePreloadFunction = (
    params: Record<string, string>,
    location: any,
    index: number
) => void

/**
 * ------------ Utils -----------
 * */

const octokit = new Octokit({
    // auth: 'Your githut auth token...',
    auth: 'd94127dffe73d353a02e15081718bf6ced05ff6a',
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

type PostMarkdownResponse = Endpoints['POST /markdown']['response']

async function getGFMSpecs(text: string) {
    const res = (await octokit.request('POST /markdown', {
        text,
    })) as PostMarkdownResponse
    return res.data as string
}
getGFMSpecs.key = 'GetGFMSpecs'

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

const prefetchRepo: RoutePreloadFunction = (params) => {
    queryCache.prefetchQuery(getRepo.key, (key) =>
        getRepo(key as string, params as { owner: string; repo: string })
    )
}

// Get Repo README

type GetRepoREADMEInput = Endpoints['GET /repos/:owner/:repo/readme']['parameters']
type GetRepoREADMEResponse = Endpoints['GET /repos/:owner/:repo/readme']['response']

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
    const data = await getGFMSpecs(atob(readMeRes.data.content))

    return data
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
 * ------------ Repo issue comments -----------
 * */

type GetRepoIssueCommentsInput = Endpoints['GET /repos/:owner/:repo/issues/:issue_number/comments']['parameters']
type GetRepoIssueCommentsResponse = Endpoints['GET /repos/:owner/:repo/issues/:issue_number/comments']['response']
export type GetRepoIssueCommentsData = GetRepoIssueCommentsResponse['data']

async function getRepoIssueComments(
    input: GetRepoIssueCommentsInput
): Promise<GetRepoIssueCommentsData> {
    const perPage = Boolean(input.per_page) ? input.per_page : 30
    const page = Boolean(input.page) ? input.page : 1

    const res = (await octokit.request(
        'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
        {
            ...input,
            per_page: perPage,
            page,
        }
    )) as GetRepoIssueCommentsResponse

    return res.data
}
getRepoIssueComments.key = 'GetRepoIssueComments'

const prefetchRepoIssueComments: RoutePreloadFunction = (params) => {
    const { owner, repo, issueNumber } = params as {
        owner: string
        repo: string
        issueNumber: string
    }
    queryCache.prefetchQuery(getRepoIssueComments.key, async () => {
        await getRepoIssueComments({
            owner,
            repo,
            issue_number: Number(issueNumber),
        })
    })
}

/**
 * ------------ Repo issue -----------
 * */

type GetRepoIssueInput = Endpoints['GET /repos/:owner/:repo/issues/:issue_number']['parameters']
type GetRepoIssueResponse = Endpoints['GET /repos/:owner/:repo/issues/:issue_number']['response']
export type GetRepoIssueData = GetRepoIssueResponse['data']

async function getRepoIssue(
    input: GetRepoIssueInput
): Promise<GetRepoIssueData> {
    const res = (await octokit.request(
        'GET /repos/{owner}/{repo}/issues/{issue_number}',
        input
    )) as GetRepoIssueResponse

    return res.data
}
getRepoIssue.key = 'GetRepoIssue'

const prefetchRepoIssue: RoutePreloadFunction = (params, ...rest) => {
    const { owner, repo, issueNumber } = params as {
        owner: string
        repo: string
        issueNumber: string
    }

    const input = {
        owner,
        repo,
        issue_number: Number(issueNumber),
    }

    queryCache.prefetchQuery(
        [getRepoIssues.key, { owner, repo, issueNumber }],
        async () => {
            await getRepoIssue(input)
        }
    )
}

/**
 * ------------ Search repos -----------
 * */

type SearchReposInput = Endpoints['GET /search/repositories']['parameters']
type SearchReposResponse = Endpoints['GET /search/repositories']['response']
export type SearchReposData = SearchReposResponse['data']

async function searchRepos(input: SearchReposInput) {
    const perPage = Boolean(input.per_page) ? input.per_page : 30
    const page = Boolean(input.page) ? input.page : 1

    const res = await octokit.search.repos({
        ...input,
        page,
        per_page: perPage,
    })

    return res.data
}
searchRepos.key = 'SearchRepos'

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
    getRepoIssueComments,
    prefetchRepoIssueComments,
    getGFMSpecs,
    searchRepos,
}
