'use client'

import useLoginModal from '@/hooks/useLoginModal'
import useRegisterModal from '@/hooks/useRegisterModal'
import { useCallback, useMemo, useState } from 'react'
import Modal from '../../ui/modal'
import RegisterStep1 from './RegisterStep1'
import RegisterStep2 from './RegisterStep2'

export enum RegisterStep {
	STEP_1 = 1,
	STEP_2 = 2
}

export default function RegisterModal() {
	const loginModal = useLoginModal()
	const registerModal = useRegisterModal()

	const [step, setStep] = useState<RegisterStep>(RegisterStep.STEP_1)
	const [data, setData] = useState<{ name: string; email: string }>({
		email: '',
		name: ''
	})

	const onClose = useCallback(() => {
		registerModal.onClose()
		setStep(RegisterStep.STEP_1)
		setData({ email: '', name: '' })
	}, [registerModal])

	const onToggle = useCallback(() => {
		loginModal.onOpen()
		registerModal.onClose()
	}, [loginModal, registerModal])

	const bodyContent = useMemo(() => {
		return step === RegisterStep.STEP_1 ? (
			<RegisterStep1
				setData={setData}
				setStep={setStep}
			/>
		) : (
			<RegisterStep2 data={data} />
		)
	}, [step, data])

	const footer = (
		<div className="text-neutral-400 text-center">
			<p>
				Already have an account?{' '}
				<span
					onClick={onToggle}
					className="text-white cursor-pointer underline"
				>
					Sign in
				</span>
			</p>
		</div>
	)

	return (
		<Modal
			body={bodyContent}
			footer={footer}
			isOpen={registerModal.isOpen}
			onClose={onClose}
			step={step}
			totalSteps={2}
		/>
	)
}
