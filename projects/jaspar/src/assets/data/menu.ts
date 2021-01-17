import { IMenu } from 'projects/core/interfaces/menu.interface';

export const app: IMenu[] = [
    {
        _id: '1',
        syscode: 'home',
        module: 'HomeModule',
        url: 'about-us'
    },
    {
        _id: '2',
        syscode: 'bookkeeping',
        module: 'BookkeepingModule',
        url: 'bookkeeping'
    },
    {
        _id: '3',
        syscode: 'archiv',
        module: 'ArchivModule',
        url: 'archiv'
    },
    {
        _id: '4',
        syscode: 'foreign-language',
        module: 'ForeignLanguageModule',
        url: 'foreign-language'
    },
    {
        _id: '5',
        syscode: 'contact',
        module: 'ContactModule',
        url: 'contact'
    },
    {
        _id: '6',
        syscode: 'blog',
        module: 'BlogModule',
        url: 'blog'
    },
    {
        _id: '7',
        syscode: 'empty',
        redirectTo: 'about-us',
        url: ''
    },
    {
        _id: '8',
        syscode: '404',
        cmp: 'PageNotFoundComponent',
        url: '**'
    }
]

export const home: IMenu[] = [
    {
        _id: '11',
        syscode: 'about',
        cmp: 'AboutComponent',
        url: '',
        parentId: '1'
    },
    {
        _id: '12',
        syscode: 'reference',
        cmp: 'ReferenceComponent',
        url: 'reference',
        parentId: '1'
    }
]

export const archiv: IMenu[] = [

]

export const blog: IMenu[] = [

]

export const bookkeeping: IMenu[] = [

]

export const contact: IMenu[] = [

]

export const language: IMenu[] = [

]