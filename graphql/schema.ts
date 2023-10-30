import { gql } from "@apollo/client";

// 회원가입 페이지 쿼리
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