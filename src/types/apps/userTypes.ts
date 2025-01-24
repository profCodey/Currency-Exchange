// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

export type UsersType = {
  id: number
 name: string
 companyShortName: string
 companyFullName: string
 companyAddress: string
 tagline: string
 taglineNote: string
 defaultFeeType: string
 phoneNumber: string
 address: string
 role: string
 facebookLink: string
 twitterLink: string
 youtubeLink: string
 avatar: string
 websiteUrl: string
 playstoreLink: string
 appstoreLink: string
 avatarColor?: ThemeColor
}

export type ProjectListDataType = {
  id: number
  img: string
  hours: string
  totalTask: string
  projectType: string
  projectTitle: string
  progressValue: number
  progressColor: ThemeColor
}
