import ArrowRightSm from '@/resources/svgx/ArrowRightSm'
import classNames from 'classnames'

export default function ConnectWalletButton({
  className,
  // pathname,
  children,
}: {
  className?: string
  // pathname: string
  children?: React.ReactNode
}) {
  return (
    <a
      className={classNames(
        'px-20 py-6 justify-center flex items-center gap-3', // inner layout
        'bg-gradient-to-br from-techyGradientA to-techyGradientB rounded-full md:max-w-md w-full', // general appearance: ;
        'font-semibold text-light', // text appearance
        'cursor-pointer hover:brightness-110 hover:gap-5 duration-300 ease-out hover:scale-105 hover:shadow-std', // interaction
        className
      )}
      href={`https://medium.com/solace-fi/solace-announces-phase-1-of-solace-airdrop-17b2afbc0259`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <p>{children ?? 'Connect Wallet'}</p> <ArrowRightSm className="fill-light" />
    </a>
  )
}
