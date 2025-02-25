import {registerBlockType} from '@wordpress/blocks';
import React from 'react';
import {MediaUpload, MediaUploadCheck} from '@wordpress/block-editor';
import {Button} from '@wordpress/components';


registerBlockType('custom-gallery-block/gallery', {
    title: 'Custom Gallery',
    icon: 'format-gallery',
    category: 'widgets',
    attributes: {
        images: {
            type: 'array',
            default: [],
        },
        columns: {
            type: 'number',
            default: 3,
        },
        gap: {
            type: 'number',
            default: 10,
        },
    },

    edit: (props) => {
        const {attributes, setAttributes} = props;
        const {images, columns, gap} = attributes;

        const onSelectImages = (newImages) => {
            setAttributes({images: newImages});
        };

        const onChangeColumns = (event) => {
            setAttributes({columns: parseInt(event.target.value, 10)});
        };

        const onChangeGap = (event) => {
            setAttributes({gap: parseInt(event.target.value, 10)});
        };

        return (
            <div>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple={true}
                        gallery={true}
                        value={images}
                        render={({open}) => (
                            <Button onClick={open} isPrimary>
                                {'Add picture'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                <div>
                    <label>
                        {'Amount of columns:'}
                        <input
                            type="number"
                            value={columns}
                            onChange={onChangeColumns}
                            min="1"
                            max="6"
                        />
                    </label>
                </div>

                <div>
                    <label>
                        {'Margins between images (px):'}
                        <input
                            type="number"
                            value={gap}
                            onChange={onChangeGap}
                            min="0"
                            max="50"
                        />
                    </label>
                </div>

                <div
                    style={{
                        display: 'grid',
                        // repeat(${columns}, 1fr) — создает сетку с количеством колонок, равным значению переменной columns.
                        // 1fr — каждая колонка занимает равную долю доступного пространства.
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: `${gap}px`,
                    }}
                >
                    {images.map((image) => (
                        <img
                            key={image.id}
                            src={image.url}
                            alt={image.alt}
                            style={{width: '100%', height: 'auto'}}
                        />
                    ))}
                </div>
            </div>
        );
    },

    save: (props) => {
        const {attributes} = props;
        const {images, columns, gap} = attributes;

        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap: `${gap}px`,
                }}
            >
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.url}
                        alt={image.alt}
                        style={{width: '100%', height: 'auto'}}
                    />
                ))}
            </div>
        );
    },
});