// Sign In (/signin): phone number → SMS code → signed in. The screen is NumberStep.jsx.
import NumberStep from './NumberStep.jsx'

export default function SignInPage() {
  return <NumberStep isSignUp={false} />
}
