import { gql } from "@apollo/client";

// 회원가입폼 불러오기
export const RECIEVE_SIMPLE_SURVEY_FORM = gql`
  query recieveSimpleSurveyForm {
    response: recieveSimpleSurveyForm {
      campusList {
        id
        value
      }
      campusNameList
      majorList {
        id
        value
      }
      majorNameList
      mbtiList {
        id
        value
      }
      genderList {
        id
        value
      }
      gradeList {
        id
        value
      }
    }
  }
`

// 휴대폰번호 중복확인
export const CHECK_ATTENDER = gql`
  query checkAttender(\$phone: String!) {
    response: checkAttender(phone: \$phone) 
  }
`;

// 회원가입
export const SIMPLE_REGIST_ATTENDER = gql`
  mutation simpleRegistAttender(\$input: simpleRegistInput!) {
    response: simpleRegistAttender(input: \$input) {
      id
    }
  }
`;
