import { Provider } from '@remix-project/remix-simulator';
import { createExecutor, resolveConfig, resolveExecutionParams } from '@rocketh/core';
import type { DeploymentStore, PromptExecutor } from '@rocketh/core/types';
import { hardhat } from 'viem/chains';

import { privateKeyToAccount } from 'viem/accounts';

import DeployScript from 'template-ethereum-contracts/deploy/001_deploy_greetings_registry.js';
import { config } from 'template-ethereum-contracts/rocketh/config.js';
import { createEmptyDeploymentStore } from './deployment-store';

const account0 = privateKeyToAccount(
	'0x503f38a9c967ed597e47fe25643985f032b072db8075426a92110f82df48dfcb'
);
console.log(account0.address);
const account1 = privateKeyToAccount(
	'0x7e5bfb82febc4c2c8529167104271ceec190eafdca277314912eaabdb67c6e5f'
);
console.log(account1.address);

export async function test() {
	const provider = new Provider({});
	await provider.init();

	const deploymentStore: DeploymentStore = createEmptyDeploymentStore();

	const promptExecutor: PromptExecutor = async () => {
		return {
			proceed: true
		};
	};

	const executor = createExecutor(deploymentStore, promptExecutor);

	const resolvedConfig = resolveConfig(config);
	const executionParams = resolveExecutionParams(resolvedConfig, {}, hardhat.id);

	// TODO
	// fix import from rocketh
	// fix deterministic
	// add option of proxy to not have implementation use deterministic
	// add "./rocketh/*": "./dist/rocketh/*", to template-ethereum-contracts exports

	const env = await executor.executeDeployScriptModules(
		[{ id: '1', module: DeployScript }],
		resolvedConfig,
		{
			...executionParams,
			provider: provider as any,
			logLevel: 6
		}
	);

	console.log(env);
}
