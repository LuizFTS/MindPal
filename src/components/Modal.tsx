'use client'
import { Fragment, ReactNode } from 'react'
import { Transition, Dialog } from '@headlessui/react'

interface ModalPropsType {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  children: ReactNode
}


export default function Modal({ open, setOpen, children }: ModalPropsType) {

  const handleCloseModal = () => {
    setOpen(false)
  }

  return (
    <Transition
      appear
      as={Fragment}
      show={open}
    >
      <Dialog as='div' className="relative z-10" onClose={handleCloseModal}>
        <Transition.Child
          enter="transition-opacity duration-1000"
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition-opacity duration-1000'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-40' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-75'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-75'
            >
              <Dialog.Panel>
                {children}
              </Dialog.Panel>

            </Transition.Child>
          </div>
        </div>

      </Dialog>

    </Transition>
  )
}