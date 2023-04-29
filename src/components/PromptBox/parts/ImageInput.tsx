import { ChangeEvent } from 'react';
import { Button, FormControl, FormLabel, Image } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';

export type ImageInputProps = {
  image: string;
  onImageChange: (image: string) => void;
};

export const ImageInput = (props: ImageInputProps) => {
  const { image } = props;
  const { onImageChange } = props;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          onImageChange(e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <>
      <Image
        src={image || ''}
        alt="preview"
        borderRadius="md"
        maxWidth={50}
        maxHeight={50}
        fallbackSrc="https://via.placeholder.com/512x768"
        fallbackStrategy="onError"
      />
      <FormControl>
        <FormLabel fontWeight="normal" fontSize="0.8rem">
          Image
        </FormLabel>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          id="image-upload"
          onChange={handleImageChange}
          onClick={(e) => {
            const target = e.target as any;
            if (target?.value) target.value = null;
          }}
        />
        <label htmlFor="image-upload">
          <Button
            rightIcon={<AttachmentIcon />}
            size="sm"
            variant="outline"
            rounded="0.125sm"
            as="span"
            fontSize="0.8rem"
            fontWeight="normal"
          >
            select
          </Button>
        </label>
      </FormControl>
    </>
  );
};
