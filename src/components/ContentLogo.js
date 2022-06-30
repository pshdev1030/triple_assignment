import styled from '@emotion/styled'

export const ContentLogo = ({ children, logoSrc }) => {
  return <ContentLogoWrapper logoSrc={logoSrc}>{children}</ContentLogoWrapper>
}

const ContentLogoWrapper = styled.div`
  background-image: url(${(props) => props.logoSrc});
  background-repeat: no-repeat;
  background-size: 400px 338px;
  padding-top: 280px;
  font-size: 15px;
  position: absolute;
  top: 150px;
  width: 400px;
  height: 338px;
  box-sizing: border-box;
  text-align: center;
  color: rgba(58, 58, 58, 0.7);
`
