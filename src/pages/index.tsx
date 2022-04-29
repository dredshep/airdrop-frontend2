/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import OwnImage from '@/components/atoms/OwnImage'
import TechyGradientText from '@/components/atoms/Typography/TechyGradientText'
import AboutLayout from '@/components/organisms/pages/about/AboutLayout'
import ConnectWalletButton from '@/components/organisms/pages/about/ConnectWalletButton'
import React, { useEffect, useState } from 'react'
import SolaceLogoSmall from '@/resources/svg/solace-logo-white-small.svg'
import Userpic from '@/resources/svgx/Userpic'
import { useWeb3React, Web3ReactProvider, UnsupportedChainIdError } from '@web3-react/core'
import { ethers, BigNumber } from '@solace-fi/sdk-nightly'
import { BrowserWalletConnector } from '@/utils/connectors'

import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from '@web3-react/walletconnect-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { shortenAddress } from '@/utils'

import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

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

export function Airdrop() {
  const { active, library, activate, deactivate, account, chainId, connector } = useWeb3React()
  const [errors, setErrors] = useState<string[]>([])

  const handleConnect = async () => {
    await activate(BrowserWalletConnector.connector, undefined, true)
      .then(() => setErrors([]))
      .catch((error) => {
        console.error('handleConnect error: ', error)
        const walletErrors: string[] = []
        if (error instanceof NoEthereumProviderError) {
          walletErrors.push('No provider found.')
        } else if (error instanceof UnsupportedChainIdError) {
          walletErrors.push('Please switch to Polygon Network.')
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          walletErrors.push('No access granted.')
        } else {
          walletErrors.push('Unknown wallet error.')
          console.log(error)
        }
        setErrors(walletErrors)
      })
  }

  const handleDisconnect = async () => {
    deactivate()
    if (connector instanceof WalletConnectConnector || connector instanceof WalletLinkConnector) {
      connector?.close().catch(console.error)
    }
  }

  const addPolygon = async () => {
    const switchToNetwork = async () => {
      const formattedChainId = ethers.utils.hexStripZeros(BigNumber.from(137).toHexString())
      try {
        await library.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: formattedChainId }],
        })
      } catch (error: any) {
        console.error('addPolygon error: ', error)
        // 4902 is the error code for attempting to switch to an unrecognized chainId
        if (error.code === 4902) {
          await library.provider.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexValue(137),
                chainName: 'Matic Network',
                nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
                rpcUrls: ['https://rpc-mainnet.matic.network'],
                blockExplorerUrls: ['https://polygonscan.com'],
              },
            ],
          })
          // metamask (only known implementer) automatically switches after a network is added
          // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
          // metamask's behavior when switching to the current network is just to return null (a no-op)
          try {
            await library.provider.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: formattedChainId }],
            })
          } catch (err) {
            console.debug('Added network but could not switch chains', err)
          }
        } else {
          throw error
        }
      }
    }

    switchToNetwork().catch((error) => {
      console.error('Failed to switch network', error)
    })
  }

  useEffect(() => {
    const check = async () => {
      if (active && chainId != 137) {
        await addPolygon()
      }
    }
    check().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, chainId])

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((e) => toast.error(e))
    }
  }, [errors])

  // community points: http://35.88.36.175:18123/allpoints
  // user points: http://35.88.36.175:18123/points?address=${account}

  const [userPoints, setUserPoints] = useState<number>(0)
  const [communityPoints, setCommunityPoints] = useState<number>(0)

  useEffect(() => {
    if (account && chainId == 137) {
      async function getUserPoints() {
        const res = await fetch(`http://localhost:3000/api/points?address=${account as string}`)
        const text = await res.text()
        console.log(text)
        return parseInt(text)
      }

      async function getCommunityPoints() {
        const res = await fetch(`http://localhost:3000/api/allpoints`)
        const text = await res.text()
        console.log(text)
        return parseInt(text)
      }
      async function updatePoints() {
        setUserPoints(await getUserPoints())
        setCommunityPoints(await getCommunityPoints())
      }
      updatePoints().catch(console.error)
    }
  }, [setUserPoints, account, chainId])

  const mainTitle = 'Airdrop'
  const subtitle = 'Learn how to become eligible for the Solace airdrop!'
  return (
    <AboutLayout title={mainTitle} subtitle={subtitle}>
      {/* top-left logo */}
      <div className="absolute left-7.5 top-7.5">
        <a href="https://solace.fi">
          <OwnImage
            className="block md:hidden ml-5 md:ml-7.5 select-none cursor-pointer"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={SolaceLogoSmall}
            alt="Small Solace Logo."
            width="132.57px"
          />
        </a>
        {/* desktop */}
        <a href="https://solace.fi">
          <OwnImage
            className="hidden md:block select-none cursor-pointer"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            src={SolaceLogoSmall}
            alt="Small Solace Logo."
            width="132.57px"
          />
        </a>
      </div>
      <div
        className="fixed top-7.5 right-7.5 h-9 rounded-full flex items-center justify-center text-dark font-title font-bold text-lg select-none cursor-pointer"
        // onClick={toggleSidebar}
        onClick={() => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          !account
            ? handleConnect().catch((e) => {
                console.error('ERROR CONNECTING TO CHAIN: ', e)
              })
            : handleDisconnect().catch((e) => console.error('ERROR CONNECTING TO CHAIN: ', e))
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
            {account ? (
              <>
                <span className="text-sm">{shortenAddress(account)}</span>
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

export default function AirdropWebsite() {
  return (
    <Web3ReactProvider
      getLibrary={(provider: any): ethers.providers.Web3Provider => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return new ethers.providers.Web3Provider(provider, 'any')
      }}
    >
      <ToastContainer position="bottom-right" />
      <Airdrop />
    </Web3ReactProvider>
  )
}
