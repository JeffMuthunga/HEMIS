import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { lighten } from '@mui/material/styles';
import { motion } from 'framer-motion';
import * as React from 'react';
import FolderItem from './FolderItem';
import FileItem from './FileItem';
import { FileManagerItem } from './FileManagerApi';

type FileManagerListProps = {
	folders: FileManagerItem[];
	files: FileManagerItem[];
};

/**
 * The file manager list.
 */
function FileManagerList(props: FileManagerListProps) {
	const { files, folders } = props;

	if (files.length === 0 && folders.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography
					color="text.secondary"
					variant="h5"
				>
					There are no items!
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="p-16 md:p-32">
			{folders?.length > 0 && (
				<Box
					className="p-16 w-full rounded-xl mb-24 border"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? lighten(theme.palette.background.default, 0.4)
								: lighten(theme.palette.background.default, 0.02)
					}}
				>
					<Typography className="font-medium">Folders</Typography>

					<div className="flex flex-wrap -m-8 mt-8">
						{folders.map((item) => (
							<FolderItem
								key={item.id}
								item={item}
							/>
						))}
					</div>
				</Box>
			)}

			{files.length > 0 && (
				<Box
					className="p-16 w-full rounded-xl mb-24 border"
					sx={{
						backgroundColor: (theme) =>
							theme.palette.mode === 'light'
								? lighten(theme.palette.background.default, 0.4)
								: lighten(theme.palette.background.default, 0.02)
					}}
				>
					<Typography className="font-medium">Files</Typography>

					<div className="flex flex-wrap -m-8 mt-8">
						{files.map((item) => (
							<FileItem
								key={item.id}
								item={item}
							/>
						))}
					</div>
				</Box>
			)}
		</div>
	);
}

export default FileManagerList;
