import React from 'react';

export const PackagePriceLayout = () => {
    return (
        <div className="flex flex-col justify-center gap-4 px-3 py-3 md:min-h-[30rem] md:flex-row md:gap-0 md:py-0">
            <div data-testid="free-pricing-modal-column"
                 className="relative flex flex-1 flex-col gap-5 text-sm justify-center rounded-xl border-s border-e border-t border-b border-gray-200 px-6 pt-6 pb-10 md:min-h-[30rem] md:max-w-96 md:rounded-none md:border-e-0 md:pb-6 md:first:rounded-ss-xl md:first:rounded-es-xl md:last:rounded-se-xl md:last:rounded-ee-xl md:last:border-e">
                <div className="relative flex flex-col bg-token-main-surface-primary">
                    <div className="flex flex-col gap-1"><p
                        className="flex items-center gap-2 text-2xl font-semibold">Free</p>
                        <div className="ms-4 mt-2 flex items-baseline gap-1.5" data-testid="free-pricing-column-cost">
                            <div className="relative"><p
                                className="text-token-text-secondary absolute -start-4 -top-0 text-2xl">$</p>
                                <div className="flex items-baseline gap-1.5">
                                    <div className="text-token-text-primary text-5xl">
                                        <div className="text-token-text-primary text-5xl">0</div>
                                    </div>
                                    <div className="mt-auto mb-0 flex h-full flex-col items-start"><p
                                        className="text-token-text-tertiary w-full text-xs">USD/<br/>month</p><p
                                        className="text-token-text-tertiary text-xs"></p></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-token-text-primary me-2 mt-2 text-base"
                           data-testid="free-pricing-column-cost-summary">Explore how AI can help you with everyday
                            tasks</p></div>
                </div>
                <button
                    className="opacity-50 cursor-not-allowed btn relative btn-secondary btn-large bg-token-sidebar-surface-tertiary text-token-text-primary hover:bg-token-sidebar-surface-tertiary dark:bg-token-text-tertiary dark:text-token-text-primary dark:hover:bg-token-text-tertiary border-none font-semibold"
                    >
                    <div className="flex items-center justify-center">Your current plan</div>
                </button>
                <div className="flex flex-col grow gap-2">
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Access to GPT-4o mini and reasoning</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Standard voice mode</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Real-time data from the web with search</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Limited access to GPT-4o and o4-mini</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Limited access to file uploads, advanced data analysis, and image generation</span>
                        </div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Use custom GPTs</span></div>
                    </div>
                </div>
                <div>
                    <div
                        className="relative flex flex-col text-xs text-token-text-secondary bg-token-main-surface-primary">
                        <div>Have an existing plan? See <a className="underline"
                                                           href="https://help.openai.com/en/collections/3943089-billing"
                                                           target="_blank">billing help</a></div>
                    </div>
                </div>
            </div>
            <div data-testid="plus-pricing-modal-column"
                 className="relative flex flex-1 flex-col gap-5 text-sm justify-center rounded-xl border-s border-e border-t border-b border-green-600 bg-green-600/5 px-6 pt-6 pb-10 md:-mt-4 md:-mb-4 md:min-h-[20rem] md:max-w-96 md:pb-6 md:first:rounded-ss-xl md:first:rounded-es-xl md:last:rounded-se-xl md:last:rounded-ee-xl">
                <div className="relative flex flex-col mt-4">
                    <div className="flex flex-col gap-1"><p
                        className="flex items-center gap-2 text-2xl font-semibold">Plus<span
                        className="ms-1 rounded px-1 py-0 text-xs font-semiboldborder-green-600 text-green-600">POPULAR</span>
                    </p>
                        <div className="ms-4 mt-2 flex items-baseline gap-1.5" data-testid="plus-pricing-column-cost">
                            <div className="relative"><p
                                className="text-token-text-secondary absolute -start-4 -top-0 text-2xl">$</p>
                                <div className="flex items-baseline gap-1.5">
                                    <div className="text-token-text-primary text-5xl">
                                        <div className="text-token-text-primary text-5xl">20</div>
                                    </div>
                                    <div className="mt-auto mb-0 flex h-full flex-col items-start"><p
                                        className="text-token-text-tertiary w-full text-xs">USD/<br/>month</p><p
                                        className="text-token-text-tertiary text-xs"></p></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-token-text-primary me-2 mt-2 text-base"
                           data-testid="plus-pricing-column-cost-summary">Level up productivity and creativity with
                            expanded access</p></div>
                </div>
                <div>
                    <button className="btn relative btn-green btn-large w-full font-semibold"
                            data-testid="select-plan-button-plus-upgrade">
                        <div className="flex items-center justify-center">Get Plus</div>
                    </button>
                </div>
                <div className="flex flex-col grow gap-2">
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Everything in Free</span></div>
                    </div>
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Extended limits on messaging, file uploads, advanced data analysis, and image generation</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Standard and advanced voice mode</span></div>
                    </div>
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Access to deep research, multiple reasoning models (o4-mini, o4-mini-high, and o3), and a research preview of GPT-4.5</span>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Create and use tasks, projects, and custom GPTs</span></div>
                    </div>
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Limited access to Sora video generation</span></div>
                    </div>
                    <div className="relative">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Opportunities to test new features</span></div>
                    </div>
                </div>
                <div>
                    <div className="relative flex flex-col text-xs text-token-text-secondary">
                        <div><a className="px-2 underline"
                                href="https://help.openai.com/en/articles/7864572-what-is-the-chatgpt-model-selector"
                                target="_blank">Limits apply</a></div>
                    </div>
                </div>
            </div>
            <div data-testid="pro-pricing-modal-column"
                 className="relative flex flex-1 flex-col gap-5 text-sm justify-center rounded-xl border-s border-e border-t border-b border-gray-200 px-6 pt-6 pb-10 md:min-h-[30rem] md:max-w-96 md:rounded-none md:border-e-0 md:pb-6 md:first:rounded-ss-xl md:first:rounded-es-xl md:last:rounded-se-xl md:last:rounded-ee-xl md:last:border-e bg-token-main-surface-primary">
                <div className="relative flex flex-col bg-token-main-surface-primary">
                    <div className="flex flex-col gap-1"><p
                        className="flex items-center gap-2 text-2xl font-semibold">Pro</p>
                        <div className="ms-4 mt-2 flex items-baseline gap-1.5" data-testid="pro-pricing-column-cost">
                            <div className="relative"><p
                                className="text-token-text-secondary absolute -start-4 -top-0 text-2xl">$</p>
                                <div className="flex items-baseline gap-1.5">
                                    <div className="text-token-text-primary text-5xl">
                                        <div className="text-token-text-primary text-5xl">200</div>
                                    </div>
                                    <div className="mt-auto mb-0 flex h-full flex-col items-start"><p
                                        className="text-token-text-tertiary w-full text-xs">USD/<br/>month</p><p
                                        className="text-token-text-tertiary text-xs"></p></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-token-text-primary me-2 mt-2 text-base"
                           data-testid="pro-pricing-column-cost-summary">Get the best of OpenAI with the highest level
                            of access</p></div>
                </div>
                <div>
                    <button className="btn relative btn-primary btn-large w-full"
                            data-testid="select-plan-button-pro-upgrade">
                        <div className="flex items-center justify-center">Get Pro</div>
                    </button>
                </div>
                <div className="flex flex-col grow gap-2">
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Everything in Plus</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Unlimited access to all reasoning models and GPT-4o</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Unlimited access to advanced voice</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Extended access to deep research, which conducts multi-step online research for complex tasks</span>
                        </div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Access to research previews of GPT-4.5 and Operator</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Access to o1 pro mode, which uses more compute for the best answers to the hardest questions</span>
                        </div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Extended access to Sora video generation</span></div>
                    </div>
                    <div className="relative bg-token-main-surface-primary">
                        <div className="text-l flex justify-start gap-2">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0">
                                <path
                                    d="M15.4835 4.14551C15.6794 3.85999 16.069 3.78747 16.3545 3.9834C16.6401 4.17933 16.7126 4.56897 16.5167 4.85449L8.9688 15.8545C8.86289 16.0088 8.69334 16.1085 8.50689 16.125C8.32053 16.1415 8.13628 16.0737 8.00494 15.9404L3.55377 11.4219L4.00005 10.9824L4.44634 10.542L8.36431 14.5176L15.4835 4.14551ZM3.55962 10.5352C3.80622 10.2922 4.20328 10.2955 4.44634 10.542L3.55377 11.4219C3.31073 11.1752 3.31297 10.7782 3.55962 10.5352Z"></path>
                            </svg>
                            <span>Access to a research preview of Codex agent</span></div>
                    </div>
                </div>
                <div>
                    <div
                        className="relative flex flex-col text-xs text-token-text-secondary bg-token-main-surface-primary px-2">
                        <div>Unlimited subject to abuse guardrails. <a className="underline" rel="noreferrer"
                                                                       href="https://help.openai.com/en/articles/9793128-what-is-chatgpt-pro"
                                                                       target="_blank">Learn more</a></div>
                    </div>
                </div>
            </div>
        </div>
    )
};
