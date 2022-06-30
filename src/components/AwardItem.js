import styled from '@emotion/styled'

export const AwardItem = ({ imageSrc, title, description }) => {
  return (
    <Award imageSrc={imageSrc}>
      {title}
      <br />
      {description}
    </Award>
  )
}

const Award = styled.div`
  display: inline-block;
  background-image: url(${(props) => props.imageSrc});
  background-position: left top;
  background-repeat: no-repeat;
  background-size: 54px 54px;
  color: rgba(58, 58, 58, 0.8);
  font-weight: bold;
  height: 54px;
  padding: 5px 0 5px 62px;
  font-size: 14px;
  line-height: 22px;
  margin-right: 39px;
`
