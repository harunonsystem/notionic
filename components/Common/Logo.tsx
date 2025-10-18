import { NotionicLogo } from '@/components/SvgIcons'

interface LogoProps {
  [key: string]: Record<string, string | number | boolean>
}

const Logo = ({ props }: LogoProps) => <NotionicLogo props={props} />

export default Logo
