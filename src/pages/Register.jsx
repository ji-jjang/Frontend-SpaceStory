import { useState } from "react";
import { baseApiUrl } from "../constants/baseApiUrl";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [registerInputData, setRegisterInputData] = useState({
    name: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  const { name, email, password, passwordCheck } = registerInputData;
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setRegisterInputData({
      ...registerInputData,
      [name]: value,
    });
  };

  const register = () => {
    if (!name || name.trim() === "") {
      alert("이름은 비어있을 수 없습니다.");
      return;
    }

    if (!password || !passwordCheck || password.length < 4) {
      alert("비밀번호는 4자리 이상이어야 합니다.");
      return;
    }

    const nameRegex = /^[a-zA-Z0-9]+$/;

    if (!nameRegex.test(name)) {
      alert("이름에는 특수문자를 사용할 수 없습니다.");
      return;
    }

    if (password !== passwordCheck) {
      alert("입력하신 두 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    (async () => {
      try {
        console.log("hello");
        const response = await axios.post(
          `${baseApiUrl}/api/v1/auth/register`,
          registerInputData,
        );
        alert("회원가입에 성공했습니다. 로그인 하세요.");
        navigate("/login");
      } catch (error) {
        if (error.response) {
          const { code, msg } = error.response.data;
          alert(`code: ${code}, msg: ${msg}`);
        } else {
          alert("회원가입 처리 중 문제가 발생했습니다.");
        }
      }
    })();
  };

  return (
    <div
      style={{
        width: "100vw",
        margin: "60px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          paddingTop: "40px",
        }}
      >
        <h2>환영합니다!</h2>
        <div>이름</div>
        <input
          name="name"
          type="text"
          placeholder="이름을 입력해 주세요."
          value={name}
          onChange={onChange}
        />
        <div>이메일</div>
        <input
          name="email"
          type="email"
          placeholder="juny@gmail.com"
          value={email}
          onChange={onChange}
        />
        <div>비밀번호</div>
        <input
          name="password"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={password}
          onChange={onChange}
        />
        <div>비밀번호 확인</div>
        <input
          name="passwordCheck"
          type="password"
          placeholder="패스워드를 입력해주세요"
          value={passwordCheck}
          onChange={onChange}
        />
        <button onClick={register}>회원가입</button>
      </div>
    </div>
  );
}
