'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import { ReactElement } from 'react'

interface IModal {
	isOpen?: boolean
	onClose?: () => void
	body?: ReactElement
	footer?: ReactElement
	isStep?: boolean
	step?: number
	totalSteps?: number
}

export default function Modal(props: IModal) {
	const { isOpen = false, onClose, body, footer, step, totalSteps } = props
	return (
		<Dialog
			open={isOpen}
			onOpenChange={onClose}
		>
			<DialogContent>
				<div className="flex items-center gap-x-6">
					<button
						onClick={onClose}
						className="p-1 border-0 text-white hover:opacity-70 transition w-fit"
					>
						<X size={28} />
					</button>
					{step && totalSteps && (
						<div className="text-xl font-bold">
							Step {step} of {totalSteps}
						</div>
					)}
				</div>
				<div>{body}</div>
				{footer && <div className="mt-4">{footer}</div>}
			</DialogContent>
		</Dialog>
	)
}
