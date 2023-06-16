/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { memo } from 'react'

import { BiArrowBack } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import { BreadCrumb, BreadCrumbItem, PageTitleContainer, Title } from './styles'

type BreadCrumbItemType = {
  label: string
  route: string
}

interface IPageTitleProps {
  breadcrumbs?: BreadCrumbItemType[]
  title: string
  backTo?: string
}

const PageTitle: React.FC<IPageTitleProps> = ({
  breadcrumbs,
  title,
  backTo,
}) => (
  <PageTitleContainer>
    {backTo && (
      <div>
        <Link to={backTo} title="Back">
          <BiArrowBack size={32} color="white" />
        </Link>
      </div>
    )}
    <div>
      <BreadCrumb>
        <BreadCrumbItem to="/">Home</BreadCrumbItem>
        {breadcrumbs &&
          breadcrumbs.map((item) => (
            <BreadCrumbItem key={item.label} to={item.route}>
              {item.label}
            </BreadCrumbItem>
          ))}
      </BreadCrumb>

      <Title>{title}</Title>
    </div>
  </PageTitleContainer>
)

export default memo(PageTitle)
