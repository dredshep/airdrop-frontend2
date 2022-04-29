import OwnImage from '@/components/atoms/OwnImage'
import TechyGradientText from '@/components/atoms/Typography/TechyGradientText'
import AboutLayout from '@/components/organisms/pages/about/AboutLayout'
import ConnectWalletButton from '@/components/organisms/pages/about/ConnectWalletButton'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import SolaceLogoSmall from '@/resources/svg/solace-logo-white-small.svg'
import Userpic from '@/resources/svgx/Userpic'
import addNetwork from '@/utils/addNetwork'

const phases = [
  {
    status: 'active',
    phase: 'Phase 1',
    points: 129,
    title: 'Community',
    description:
      'The first phase allows existing and new community members to earn points for each new member they have invited to the Solace Discord.',
    link: 'https://medium.com/solace-fi/solace-announces-phase-1-of-solace-airdrop-17b2afbc0259',
    steps: [
      {
        itemIsLink: true,
        text: 'Join the Solace Discord server',
        url: 'https://discord.gg/fjQWZjW',
      },
      {
        itemIsLink: true,
        text: 'Copy your unique invite link',
        url: 'https://www.businessinsider.com/how-to-add-people-on-discord',
      },
      { text: 'Invite your friends' },
      { text: 'Earn 40 new points for each new member' },
    ],
  },
  {
    status: 'upcoming',
    phase: 'Phase 2',
    points: 0,
    title: 'Commitment',
    description: `The commitment phase offers users the highest rewards. There are three ways to
		earn points during this phase. The first way is to buy Solace Wallet Coverage. The second	way
		is to refer other users to buy coverage. And the third way is to stake and lock $SOLACE tokens.`,
    link: 'https://medium.com/solace-fi/solace-announces-phase-2-of-solace-airdrop-17b2afbc0259',
    steps: [
      {
        itemIsLink: true,
        text: 'Buy Solace Wallet Coverage',
        url: 'https://www.youtube.com/watch?v=meb8JXP8iYA&feature=youtu.be',
      },
      {
        itemIsLink: true,
        text: 'Refer other users to buy coverage',
        url: 'https://www.youtube.com/watch?v=meb8JXP8iYA&t=323s',
      },
      {
        itemIsLink: true,
        text: 'Stake and lock $SOLACE tokens',
        url: 'https://www.youtube.com/watch?v=RUn4QFZilTU',
      },
    ],
  },
  {
    status: 'upcoming',
    phase: 'Phase 3',
    points: 0,
    title: 'LockDrop',
    description: `In the lockdrop phase eligible wallets can claim their tokens. This is similar
		to an airdrop except that users have the optional additional benefit of investing their claimable
		tokens into their existing locks to receive larger airdrop rewards. Users who do not lock their
		reward may claim their reward but they miss out on these additional rewards.`,
  },
] as Phase[]

type Phase = {
  status: 'active' | 'upcoming'
  phase: string
  points: number
  title: string
  description: string
  link: string
  steps: {
    itemIsLink: boolean
    text: string
    url?: string
  }[]
}

function PhaseElement({ phaseProps }: { phaseProps: Phase }) {
  const { phase, points, title, description, steps } = phaseProps
  return (
    <div className="mt-9 rounded-std bg-white p-12 flex gap-6 shadow-std">
      <div className="w-[162px] shrink-0">
        <h3 className="text-4xl font-title leading-[43.88px]">{phase}</h3>
        <TechyGradientText className="text-4xl font-semibold flex align-baseline gap-2">
          {points}
          <span className="text-base leading-[49.03px]">{points === 1 ? 'point' : 'points'}</span>
        </TechyGradientText>
      </div>
      <div>
        <h3>
          <TechyGradientText className="text-4xl font-title leading-[43.88px] font-semibold">
            {title}
          </TechyGradientText>
        </h3>
        <p className="mt-2">{description}</p>
        {steps && (
          <>
            <h4 className="font-title font-bold mt-9">How to earn points in this phase</h4>
            <ol className="list-decimal mt-4 leading-loose ml-5">
              {steps.map(({ itemIsLink, text, url }, index) => (
                <li key={index}>
                  <span className="ml-1.5">
                    {itemIsLink ? (
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue underline"
                      >
                        {text}
                      </a>
                    ) : (
                      text
                    )}
                  </span>
                </li>
              ))}
            </ol>
            <ConnectWalletButton className="w-[327px] mt-9">Learn more</ConnectWalletButton>
          </>
        )}
      </div>
    </div>
  )
}

function TopBox({ userPoints, communityPoints }: { userPoints: number; communityPoints: number }) {
  return (
    <div className="w-full flex rounded-std flex-row flex-wrap overflow-hidden font-title font-semibold mt-16">
      <div className="bg-gradient-to-br from-techyGradientA to-techyGradientB flex flex-nowrap items-stretch justify-around py-9 px-24 flex-1 text-light">
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl leading-6">My Points</div>
          <div className="text-base leading-4">Total</div>
          <div className="text-4xl font-semibold leading-[54px]">{userPoints}</div>
        </div>
        <div className="bg-light w-px"></div>
        <div className="flex flex-col items-center gap-2">
          <div className="text-2xl leading-6">My Share</div>
          <div className="text-base leading-4">of the pool</div>
          <div className="text-4xl font-semibold leading-[54px]">
            {userPoints === 0 ? '0' : ((userPoints / communityPoints) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
      <div className="bg-white py-9 px-24 flex-[0.4546] text-dark">
        <div className="flex flex-col items-center gap-2">
          <TechyGradientText className="text-2xl leading-6">Community Points</TechyGradientText>
          <div className="text-base leading-4">Total</div>
          <TechyGradientText className="text-4xl font-semibold leading-[54px]">
            {communityPoints}
          </TechyGradientText>
        </div>
      </div>
    </div>
  )
}

function PhaseSectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-4xl font-semibold font-title mb-[calc(3.88px/2)] mt-15">{children}</h2>
}

export default function Airdrop() {
  /**
   * handling polygon address
   * if polygon address is in local storage, set it to state
   * if polygon address is in state, set it to local storage
   *
   * handleConnect is a function that tells metamask to connect
   */

  type CustomWindow = Window & {
    ethereum: {
      // user address
      selectedAddress: string
      // chain id
      chainId: number
      // request connect
      enable: () => Promise<void>
    }
  }

  const [polygonAddress, setPolygonAddress] = useState<string | null>(null)
  const handleConnect = async () => {
    const ethereum = (window as unknown as CustomWindow).ethereum

    // get the address from metamask
    if (ethereum) {
      await ethereum.enable()

      // detect chain id
      const chainId = ethereum.chainId
      // check if it's polygon
      if (chainId !== 137) {
        // if not polygon, set chain id to polygon
        await addNetwork(chainId)
      }
      // set the address to state
      setPolygonAddress(ethereum.selectedAddress)
    }
  }

  // if state changes, set the address to local storage
  useEffect(() => {
    if (polygonAddress) {
      localStorage.setItem('polygonAddress', polygonAddress)
    }
  }, [polygonAddress])

  // if local storage has an address, set it to state
  useEffect(() => {
    const address = localStorage.getItem('polygonAddress')
    if (address) {
      setPolygonAddress(address)
    }
  }, [])

  // community points: http://35.88.36.175:18123/allpoints
  // user points: http://35.88.36.175:18123/points?address=${polygonAddress}

  const [userPoints, setUserPoints] = useState<number>(0)
  const [communityPoints, setCommunityPoints] = useState<number>(0)

  useEffect(() => {
    if (polygonAddress) {
      async function getUserPoints() {
        const res = await fetch(
          `http://35.88.36.175:18123/points?address=${polygonAddress as string}`
        )
        return parseInt(await res.text())
      }

      async function getCommunityPoints() {
        const res = await fetch(`http://35.88.36.175:18123/allpoints`)
        return parseInt(await res.text())
      }
      async function updatePoints() {
        setUserPoints(await getUserPoints())
        setCommunityPoints(await getCommunityPoints())
      }
      updatePoints().catch(console.error)
    }
  }, [setUserPoints, polygonAddress])

  const mainTitle = 'Airdrop'
  const subtitle = 'Learn how to become eligible for the Solace airdrop!'
  return (
    <AboutLayout title={mainTitle} subtitle={subtitle}>
      {/* top-left logo */}
      <div className="absolute left-7.5 top-7.5">
        <Link href="/" passHref={undefined}>
          <OwnImage
            className="block md:hidden ml-5 md:ml-7.5 select-none cursor-pointer"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={SolaceLogoSmall}
            alt="Small Solace Logo."
            width="132.57px"
          />
        </Link>
        {/* desktop */}
        <Link href="/" passHref={undefined}>
          <OwnImage
            className="hidden md:block select-none cursor-pointer"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={SolaceLogoSmall}
            alt="Small Solace Logo."
            width="132.57px"
          />
        </Link>
      </div>
      <div
        className="fixed top-7.5 right-7.5 h-9 rounded-full flex items-center justify-center text-dark font-title font-bold text-lg select-none cursor-pointer"
        // onClick={toggleSidebar}
        onClick={() => {
          handleConnect().catch((e) => {
            console.error('ERROR CONNECTING TO CHAIN: ', e)
          })
        }}
      >
        <div className="h-[52px] rounded-full gap-2 bg-light flex items-center select-none cursor-pointer hover:brightness-110 duration-200 ease-out group">
          {/* userpic h-9 w-9 m-2 */}
          {/* <div className="h-9 w-9 m-2 bg-gradient-to-br from-warmGradientA to-warmGradientB rounded-full group-hover:animate-spin" /> */}
          <Userpic className="h-9 w-9 m-2 text-blue font-title" />

          {/* text */}
          <div
            // href="https://app.solace.fi/cover?connect-wallet=true"
            className="text-sm mr-4 mb-4 mt-4 font-bold  font-title text-transparent bg-gradient-to-br from-techyGradientA to-techyGradientB bg-clip-text "
          >
            {polygonAddress ? (
              <>
                <span className="text-sm">{polygonAddress}</span>
                <span className="text-sm"> | </span>
                <span className="text-sm">Connected</span>
              </>
            ) : (
              <>
                <span className="text-sm">Connect Wallet</span>
              </>
            )}
          </div>
        </div>
      </div>
      <TopBox userPoints={userPoints} communityPoints={communityPoints} />
      <PhaseSectionTitle>Active Phases</PhaseSectionTitle>
      {phases
        .filter((phase) => phase.status === 'active')
        .map((phase) => (
          <PhaseElement key={phase.phase} phaseProps={phase} />
        ))}
      <PhaseSectionTitle>Upcoming Phases</PhaseSectionTitle>
      {phases
        .filter((phase) => phase.status === 'upcoming')
        .map((phase) => (
          <PhaseElement key={phase.phase} phaseProps={phase} />
        ))}
      <div className="h-20"></div>
    </AboutLayout>
  )
}
